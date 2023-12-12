<script>

import axios from 'axios';
import HomeView from './view/HomeView.vue';
import AppHeader from './components/AppHeader.vue';
import AppFooter from './components/AppFooter.vue';


export default {
    name: 'App',
    components: {
        HomeView,
        AppHeader,
        AppFooter,
    },
    data() {
        return {
            apartments: [],
            baseUrl: 'http://127.0.0.1:8000/'
        }
    },
    methods: {
        async getApartments() {
            const data = await axios.get('http://127.0.0.1:8000/api/apartment')
            this.apartments = data.data.result;
        }
    },
    mounted() {
        this.getApartments();
    }
}


</script>

<template>
    <AppHeader></AppHeader>

    <main>
        <router-vieww>
            <div class=" py-4 border-top px-5">
                <button class="btn d-flex align-items-center" style="border: 1px solid gray; border-radius: 12px;">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation"
                        focusable="false"
                        style="display: block; fill: none; height: 16px; width: 16px; stroke: currentcolor; stroke-width: 3; overflow: visible;"
                        class="me-2">
                        <g fill="none">
                            <path d="M2 16h28M2 24h28M2 8h28"></path>
                        </g>
                    </svg> Filtri </button>
            </div>
            <div>
                <div class="px-5 py-4">
                    <div class="container">
                        <div class="row">
                            <div class="col-3" v-for="apartment in apartments">
                                <div class="card mb-5" style="width: 18rem; border: none;">
                                    <img :src="baseUrl + 'storage/' + apartment.cover_image" class="card-img-top" alt="..."
                                        style="border-radius: 13px;">
                                    <div class="card-body">
                                        <h5 class="card-title">{{ apartment.name }}</h5>
                                        <p class="card-text">{{ apartment.description }}</p>
                                        <a href="#" class="btn text-white" style="background-color: #ff385c;">Open</a>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </router-vieww>
    </main>

    <AppFooter></AppFooter>
</template>

<style scoped></style>
