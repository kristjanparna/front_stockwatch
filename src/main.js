import Vue from 'vue'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.js"
import App from './App.vue'
import router from './router'
import VueAxios from "vue-axios";
import axios from "axios";

Vue.use(VueAxios, axios)

Vue.config.productionTip = false

new Vue({
  router,
  render: function (h) { return h(App) }
}).$mount('#app')
