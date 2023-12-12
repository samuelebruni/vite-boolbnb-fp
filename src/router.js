import { createRouter, createWebHashHistory } from 'vue-router';

import Homepage from './view/Homepage.vue';
import Apartment from './view/Apartment.vue';


const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: Homepage
        },
        {
            path: '/apartment/:id',
            name: 'apartment',
            component: Apartment
        },

    ]
});

export { router }