
import { createRouter, createWebHistory } from 'vue-router';





const routes = [
    { path: "/apprentices", component: () => import('../views/apprentices.vue') },
    { path: "/assignments", component: () => import('../views/assignments.vue') }
];

export const router = createRouter({
    history: createWebHistory(),
    routes
});
