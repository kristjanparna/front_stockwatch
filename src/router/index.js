import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from "@/views/LoginView";
import RegisterView from "@/views/RegisterView";
import WatchListView from "@/views/WatchListView";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'loginRoute',
    component: LoginView
  },
  {
    path: '/register',
    name: 'registerRoute',
    component: RegisterView
  },
  {
    path: "/watchlist",
    name: 'watchListRoute',
    component: WatchListView
  }
]

const router = new VueRouter({
  routes
})

export default router
