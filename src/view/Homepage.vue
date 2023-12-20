

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
            filteredApartments: [],
            baseUrl: 'http://127.0.0.1:8000/',
            loading: false,
        };
    },
    methods: {
        async getApartments(filters = null) {
            try {
                this.loading = true;
                const data = await axios.post(`${this.baseUrl}api/apartments`, filters);
                this.apartments = data.data.result;
                this.loading = false;

                if (filters && filters.latitude && filters.longitude) {
                    const { latitude, longitude, radius } = filters;


                    this.filteredApartments = this.apartments.filter((apartment) => {
                        const distance = this.calculateHaversineDistance(
                            latitude,
                            longitude,
                            apartment.latitude,
                            apartment.longitude
                        );

                        return distance <= radius;
                    });
                } else {
                    this.filteredApartments = this.apartments;
                }
            } catch (error) {
                this.loading = false;
                console.error('Error fetching apartments:', error);
            }
        },
        calculateHaversineDistance(lat1, lon1, lat2, lon2) {
            const R = 6371;
            const dLat = this.deg2rad(lat2 - lat1);
            const dLon = this.deg2rad(lon2 - lon1);

            const a =
                Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(this.deg2rad(lat1)) *
                Math.cos(this.deg2rad(lat2)) *
                Math.sin(dLon / 2) *
                Math.sin(dLon / 2);

            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

            const distance = R * c;

            return distance;
        },
        deg2rad(deg) {
            return deg * (Math.PI / 180);
        },
        updateFilteredApartments(filteredApartments) {
            this.filteredApartments = filteredApartments;
        },
        updateFilteredApartmentsBySearch(searchTerm) {
            this.filteredApartments = this.apartments.filter((apartment) => {
                return (
                    (apartment.municipality && apartment.municipality.toLowerCase().includes(searchTerm.toLowerCase())) ||
                    (apartment.name && apartment.name.toLowerCase().includes(searchTerm.toLowerCase()))
                );
            });
        },
        filterSearch(filters) {
            console.log(filters, 'ciao');
            this.getApartments(filters);
        },
    },
    watch: {
        'AppHeader.searchTerm': function (newSearchTerm) {
            this.updateFilteredApartmentsBySearch(newSearchTerm);
        },
    },
    mounted() {
        console.log('Homepage mounted');

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
                    <div class="col-12 col-md-4 col-sm-6 col-lg-3" style="height: 200px; margin-bottom: 20px;"
                        v-if="apartments.length > 0 && !loading"
                        v-for="apartment in filteredApartments.length > 0 ? filteredApartments : apartments"
                        :key="apartment.id">
                        <AppCard :apartment="apartment" />
                    </div>
                    <div v-else-if="loading" class="container_loader">
                        <div id="wifi-loader">
                            <svg class="circle-outer" viewBox="0 0 86 86">
                                <circle class="back" cx="43" cy="43" r="40"></circle>
                                <circle class="front" cx="43" cy="43" r="40"></circle>
                                <circle class="new" cx="43" cy="43" r="40"></circle>
                            </svg>
                            <svg class="circle-middle" viewBox="0 0 60 60">
                                <circle class="back" cx="30" cy="30" r="27"></circle>
                                <circle class="front" cx="30" cy="30" r="27"></circle>
                            </svg>
                            <svg class="circle-inner" viewBox="0 0 34 34">
                                <circle class="back" cx="17" cy="17" r="14"></circle>
                                <circle class="front" cx="17" cy="17" r="14"></circle>
                            </svg>
                            <div class="text" data-text="Loading"></div>
                        </div>
                    </div>
                    <div v-else>
                        <h2>Spiacente! Non abbiamo trovato nessun immobile con i filtri selezionati</h2>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped></style>
