import Apprentices from "../views/Apprentices.vue"
import Assignments from "../views/Assignments.vue"
import Binnacles from "../views/Binnacles.vue"
import Fiches from "../views/Fiches.vue"
import Followups from "../views/Followup.vue"
import Home from "../views/Home.vue"
import Modality from "../views/Modality.vue"
import Register from "../views/Register.vue"
import UserEp from "../views/UserEP.vue"
import UserEPLogin from "../views/UserEPlogin.vue"

import {createRouter, createWebHistory} from "vue-router"


const routes = [
  {path: "/", component: UserEPLogin},
{
  path: "/home", component: Home, children:[
    {path: "binnacles", component: Binnacles},
    {path: "fiches", component: Fiches},
    {path: "followups", component: Followups},
    {path: "modalities", component: Modality},
    {path: "register", component: Register},
    {path: "userep", component: UserEp},
    {path: "apprentices", component: Apprentices},
    {path: "assignments", component: Assignments}
  ]
}

]

export const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('token');
  
    if (to.matched.some(record => record.meta.requiresAuth)) {
      if (!token) {
        next({ path: '/' });
      } else {
        next();
      }
    } else {
      next();
    }
  });
  
