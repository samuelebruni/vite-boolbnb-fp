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
    <AppHeader></AppHeader>

    <main>

        <router-view></router-view>

    </main>

    <AppFooter></AppFooter>
</template>

<style scoped></style>
