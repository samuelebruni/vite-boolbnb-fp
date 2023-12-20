

<script>
import axios from 'axios';
import AppCard from '../components/AppCard.vue';
import AppFilter from '../components/AppFilter.vue';
import AppCardSponsored from '../components/AppCardSponsored.vue';
import { emitter } from '../eventBus';


export default {
    name: 'Homepage',
    components: {
        AppCard,
        AppFilter,
        AppCardSponsored,
    },
    data() {
        return {
            apartments: [],
            filteredApartments: [],
            filteredSponsoredApartments: [],
            filteredNonSponsoredApartments: [],
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

                // Filter apartments based on sponsorship
                this.filteredSponsoredApartments = this.apartments.filter(
                    (apartment) => apartment.sponsorships.length > 0
                );
                this.filteredNonSponsoredApartments = this.apartments.filter(
                    (apartment) => apartment.sponsorships.length === 0
                );

                // If there is a search term, update filteredApartments
                if (this.searchTerm) {
                    this.updateFilteredApartmentsBySearch(this.searchTerm);
                } else {
                    // Otherwise, use all apartments
                    this.filteredApartments = this.apartments;
                }

                // Check if latitude and longitude are present in filters
                if (filters && (filters.latitude || filters.longitude)) {
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

                    // Separate sponsored and non-sponsored apartments
                    this.filteredSponsoredApartments = this.filteredApartments.filter(
                        (apartment) => apartment.sponsorships.length > 0
                    );
                    this.filteredNonSponsoredApartments = this.filteredApartments.filter(
                        (apartment) => apartment.sponsorships.length === 0
                    );
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
            // Separate sponsored and non-sponsored apartments
            this.filteredSponsoredApartments = this.filteredApartments.filter(
                (apartment) => apartment.sponsorships.length > 0
            );
            this.filteredNonSponsoredApartments = this.filteredApartments.filter(
                (apartment) => apartment.sponsorships.length === 0
            );

            // Update the main filteredApartments array
            this.filteredApartments = filteredApartments;
        },
        filterSearch(filters) {
            // Handle filtering based on the search term
            if (filters.searchTerm) {
                this.updateFilteredApartmentsBySearch(filters.searchTerm);
            } else {
                // Handle other filters
                this.getApartments(filters);
            }
        },
    },
    mounted() {
        console.log('Homepage mounted');

        emitter.on('searchTermChanged', (newSearchTerm) => {
            this.searchTerm = newSearchTerm;
            this.updateFilteredApartmentsBySearch(newSearchTerm);
        });
        this.getApartments();
    },
    updated() {
        console.log('Homepage updated');
    },
    computed: {
        sponsoredApartments() {
            // Filter sponsored apartments
            return this.filteredSponsoredApartments;
        },
        regularApartments() {
            // Filter non-sponsored apartments
            return this.filteredNonSponsoredApartments;
        },
    }
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
                        v-if="sponsoredApartments.length > 0" v-for="apartment in sponsoredApartments" :key="apartment.id">
                        <AppCardSponsored :apartment="apartment" />
                    </div>
                    <!-- Display non-sponsored apartments next -->
                    <div class="col-12 col-md-4 col-sm-6 col-lg-3" style="height: 200px; margin-bottom: 20px;"
                        v-if="regularApartments.length > 0" v-for="apartment in regularApartments" :key="apartment.id">
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
