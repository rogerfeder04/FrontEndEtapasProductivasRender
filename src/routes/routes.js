import Apprentices from "../views/apprentices.vue"
import Assignments from "../views/assignments.vue"
import Binnacles from "../views/binnacles.vue"
import Fiches from "../views/fiches.vue"
import Followups from "../views/followup.vue"
import Home from "../views/home.vue"
import Modality from "../views/modality.vue"
import Register from "../views/register.vue"
import UserEp from "../views/userEP.vue"
import UserEPLogin from "../views/userEPlogin.vue"

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
  
