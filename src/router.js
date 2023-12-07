import { createRouter, createWebHashHistory } from 'vue-router';

import HomeView from './view/HomeView.vue';


const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView
        },
       
    ]
});

export { router }