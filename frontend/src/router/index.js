// src/router/index.js
import {createRouter, createWebHistory} from 'vue-router'
import UserLogin from '../components/UserLogin.vue'
import UserRegister from "@/components/UserRegister.vue";
import HomeComponent from "@/components/Home.vue";

const routes = [
  {
    path     : '/auth/login',
    name     : 'login',
    component: UserLogin
  },
  {
    path     : '/auth/register',
    name     : 'register',
    component: UserRegister
  },
  {
    path     : '/home',
    name     : 'home',
    component: HomeComponent,
    meta     : {
      middleware: "auth",
    },
  },
  {
    path    : '/',
    redirect: '/home'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {

  if (to.meta.middleware == "auth") {
    const token = localStorage.getItem("auth-token");

    if (!token) {
      next({name: "login"});
    }
  }

  next();
});

export default router
