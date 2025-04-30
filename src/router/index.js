import { createRouter, createWebHistory } from 'vue-router';

import Home from '@/views/Home.vue';

const routes = [
    // route records
    { path: '/', name: 'Home', component: Home },
    { 
        path: '/destination/:id/:slug',
        name: 'destination.show',
        component: () => import('@/views/DestinationShow.vue') ,
        // props: true, // it automatically maps route params to component props
        props: (route) => ({ ...route.params, id: parseInt(route.params.id) })
    },
    { 
        path: '/destination/:id/:slug/:experienceSlug',
        name: 'experience.show',
        component: () => import('@/views/ExperienceShow.vue') ,
        props: (route) => ({ ...route.params, id: parseInt(route.params.id) })
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
    // linkActiveClass: 'active-link' // to rename router-link-active class
});

export default router;
