//Rutas de los componentes aquí
// import Login from "../views/Login.vue"
import { createRouter, createWebHistory } from 'vue-router';
import Layout from "../layouts/layout.vue";

const routes = [
    { path: "/layout", component: Layout }
];

export const router = createRouter({
    history: createWebHistory(),
    routes
});

