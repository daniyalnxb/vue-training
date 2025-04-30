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
        props: (route) => ({ ...route.params, id: parseInt(route.params.id) }),
        children: [
            // Before it was the sibiling root, but now we make this route the children of destination.show route
            { 
                path: ':experienceSlug',
                name: 'experience.show',
                component: () => import('@/views/ExperienceShow.vue') ,
                props: (route) => ({ ...route.params, id: parseInt(route.params.id) })
            }
        ]
    },
    {
        path: '/:pathMatch(.*)*', // must use this regex to match all paths in vue router 4
        name: 'NotFound',
        component: () => import('@/views/NotFound.vue')
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
    // linkActiveClass: 'active-link' // to rename router-link-active class
});

export default router;
