import { createRouter, createWebHistory } from 'vue-router';

import Home from '@/views/Home.vue';

const routes = [
    // route records
    { path: '/', name: 'Home', component: Home },
    { path: '/destination/:id/:slug', name: 'destination.show', component: () => import('@/views/DestinationShow.vue') }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
    // linkActiveClass: 'active-link' // to rename router-link-active class
});

export default router;
