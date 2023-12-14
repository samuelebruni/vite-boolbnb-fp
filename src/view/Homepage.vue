<script>
import axios from 'axios';
import AppCard from '../components/AppCard.vue';
import AppFilter from '../components/AppFilter.vue';

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
            baseUrl: 'http://127.0.0.1:8001/',
        };
    },
    methods: {
        async getApartments(filters = null) {
            const data = await axios.post('http://127.0.0.1:8001/api/apartments', filters);
            this.apartments = data.data.result;
        },
        //Setup filter for search
        filterSearch(filters) {
            //Remake getApartments with filters
            this.getApartments(filters)
        }
    },
    mounted() {
        this.getApartments();
    },
};
</script>

<template>
    <div>
        <!-- Pass the apartments and updateFilteredApartments method to AppFilter -->
        <AppFilter @filterSearch='filterSearch' :apartments="apartments" />

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
