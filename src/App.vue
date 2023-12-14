<script>
import axios from 'axios';
import AppHeader from './components/AppHeader.vue';
import AppFooter from './components/AppFooter.vue';

export default {
    name: 'App',
    components: {
        AppHeader,
        AppFooter,
    },
    data() {
        return {
            apartments: [],
            filteredApartments: [],
            baseUrl: 'http://127.0.0.1:8000/',
        };
    },
    methods: {
        async getApartments() {
            const data = await axios.get(`${this.baseUrl}api/apartment`);
            this.apartments = data.data.result;
        },
        updateFilteredApartmentsBySearch(searchTerm) {
            // Check if the search term is empty
            if (!searchTerm) {
                // If the search term is empty, show all apartments
                this.filteredApartments = this.apartments;
                return;
            }

            // Implement your filtering logic here
            // For example, filtering by name or city
            this.filteredApartments = this.apartments.filter((apartment) => {
                const cityMatch = apartment.municipality && apartment.municipality.toLowerCase().includes(searchTerm.toLowerCase());
                const nameMatch = apartment.name && apartment.name.toLowerCase().includes(searchTerm.toLowerCase());
                return cityMatch || nameMatch;
            });

            console.log('Search Term:', searchTerm);
            console.log('Filtered Apartments:', this.filteredApartments);
        },
    },
    mounted() {
        this.getApartments();
    },
};
</script>

<template>
    <div>
        <AppHeader @updateSearch="updateFilteredApartmentsBySearch"></AppHeader>

        <main>
            <router-view></router-view>
        </main>

        <AppFooter />
    </div>
</template>

<style scoped></style>
