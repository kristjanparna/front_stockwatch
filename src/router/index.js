import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RegisterView from "@/views/RegisterView";
import WatchListView from "@/views/WatchListView";
import PortfolioView from "@/views/PortfolioView";
import HistoryView from "@/views/HistoryView";

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
  }
]

const router = new VueRouter({
  routes
})

export default router
