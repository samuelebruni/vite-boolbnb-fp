<script>
import axios from 'axios';
import AppCard from '../components/AppCard.vue';
import AppFilter from '../components/AppFilter.vue';
import { emitter } from '../eventBus';

export default {
    name: 'Homepage',
    components: {
        AppCard,
        AppFilter,
    },
    data() {
        return {
            apartments: [],
            filteredApartments: [], // New data property to store filtered apartments
            baseUrl: 'http://127.0.0.1:8000/',
        };
    },
    methods: {
        async getApartments(filters = null) {
            const data = await axios.post(`${this.baseUrl}api/apartments`, filters);
            this.apartments = data.data.result;
            // Initialize filteredApartments with all apartments
            console.log(this.apartments);
            this.filteredApartments = this.apartments;
        },
        // Add a method to update the filtered apartments
        updateFilteredApartments(filteredApartments) {
            this.filteredApartments = filteredApartments;
        },
        // Add a method to update the filtered apartments based on the search term
        updateFilteredApartmentsBySearch(searchTerm) {
            this.filteredApartments = this.apartments.filter((apartment) => {
                return (
                    (apartment.municipality && apartment.municipality.toLowerCase().includes(searchTerm.toLowerCase())) ||
                    (apartment.name && apartment.name.toLowerCase().includes(searchTerm.toLowerCase()))
                );
            });
        },
        filterSearch(filters) {
            //Remake getApartments with filters
            console.log(filters, 'ciao');
            this.getApartments(filters)
        }
    },
    watch: {
        // Watch for changes to the search term and trigger the filtering
        'AppHeader.searchTerm': function (newSearchTerm) {
            this.updateFilteredApartmentsBySearch(newSearchTerm);
        },
        //Setup filter for search
    },
    mounted() {
        console.log('Homepage mounted');

        // Listen for the searchTermChanged event
        emitter.on('searchTermChanged', (newSearchTerm) => {
            this.updateFilteredApartmentsBySearch(newSearchTerm);
        });
        this.getApartments();
    },
    updated() {
        console.log('Homepage updated');
    },
};
</script>

<template>
    <div>
        <!-- Pass the apartments and updateFilteredApartments method to AppFilter -->
        <AppFilter @filter-search='filterSearch' :apartments="apartments" />

        <div class="px-5 py-4">
            <div class="container">
                <div class="row">
                    <!-- Use filteredApartments if available, otherwise use all apartments -->
                    <div class="col-12 col-md-4 col-sm-6 col-lg-3"
                        v-for="apartment in filteredApartments.length > 0 ? filteredApartments : apartments"
                        :key="apartment.id">
                        <AppCard :apartment="apartment" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped></style>
