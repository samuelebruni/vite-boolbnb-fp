<script>

import axios from 'axios';
import AppHeader from './components/AppHeader.vue';
import AppFooter from './components/AppFooter.vue';
import AppFilter from './components/AppFilter.vue';

export default {
    name: 'App',
    components: {
        AppHeader,
        AppFooter,
        AppFilter,
    },
    data() {
        return {
            apartments: [],
            baseUrl: 'http://127.0.0.1:8001/'
        }
    },
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
