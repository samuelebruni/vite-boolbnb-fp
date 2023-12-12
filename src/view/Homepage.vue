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
            baseUrl: 'http://127.0.0.1:8000/',
        };
    },
    methods: {
        async getApartments() {
            const data = await axios.get('http://127.0.0.1:8000/api/apartment');
            this.apartments = data.data.result;
        },
        // Add a method to update the filtered apartments
        updateFilteredApartments(filteredApartments) {
            this.filteredApartments = filteredApartments;
        },
    },
    mounted() {
        this.getApartments();
    },
};
</script>

<template>
    <div>
        <!-- Pass the apartments and updateFilteredApartments method to AppFilter -->
        <AppFilter :apartments="apartments" @updateFilteredApartments="updateFilteredApartments" />

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
