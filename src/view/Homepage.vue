<script>
import axios from 'axios';
import AppCard from '../components/AppCard.vue';


export default {
    name: 'Homepage',
    components: {
        AppCard
    },
    data() {
        return {
            apartments: [],
            baseUrl: 'http://127.0.0.1:8000/'
        }
    },
    methods: {
        async getApartments() {
            const data = await axios.get('http://127.0.0.1:8001/api/apartment')
            this.apartments = data.data.result;
        }
    },
    mounted() {
        this.getApartments();
    }
}
</script>

<template>
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
                    <div class="col-12 col-md-4 col-sm-6 col-lg-3" v-for="apartment in apartments">
                        <AppCard :apartment="apartment" />
                    </div>
                </div>

            </div>

        </div>
    </div>
</template>


<style lang="scss" scoped></style>