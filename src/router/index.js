import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RegisterView from "@/views/RegisterView";
import WatchListView from "@/views/WatchListView";
import PortfolioView from "@/views/PortfolioView";
import HistoryView from "@/views/HistoryView";
import AdminView from "@/views/AdminView";
import SearchView from "@/views/SearchView";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/register',
    name: 'registerRoute',
    component: RegisterView
  },
  {
    path: '/watchlist',
    name: 'watchListRoute',
    component: WatchListView
  },
  {
    path: '/portfolio',
    name: 'portfolioRoute',
    component: PortfolioView
  },
  {
    path: '/history',
    name: 'historyRoute',
    component: HistoryView
  },
  {
    path: '/admin',
    name: 'aminRoute',
    component: AdminView
  },
  {
    path: '/search',
    name:  'searchRoute',
    component: SearchView
  }
]

const router = new VueRouter({
  routes
})

export default router
