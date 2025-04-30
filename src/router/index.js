import { createRouter, createWebHistory } from 'vue-router';

import Home from '@/views/Home.vue';
import { destinations } from '@/destinations-data';

const routes = [
    // route records
    { path: '/', name: 'Home', component: Home },
    { 
        path: '/destination/:id/:slug',
        name: 'destination.show',
        component: () => import('@/views/DestinationShow.vue') ,
        // props: true, // it automatically maps route params to component props
        props: (route) => ({ ...route.params, id: parseInt(route.params.id) }),
        // per-route navigation gurard here, other two types are global and in-component guards
        beforeEnter(to, from) {
            const exists = destinations?.find((destination) => destination.id === parseInt(to.params.id));
            if (!exists) {
                return {
                    name: 'NotFound',
                    params: { pathMatch: to.path.split('/').slice(1) },
                    query: to.query,
                    hash: to.hash
                }; // redirect to NotFound route
            }
        },
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
