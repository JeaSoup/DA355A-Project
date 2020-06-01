import Vue from 'vue'
import App from './App.vue'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default-dark.css'
import VueGeolocation from 'vue-browser-geolocation'
import axios from 'axios'
import FlagIcon from 'vue-flag-icon'

Vue.prototype.$http = axios
Vue.use(VueGeolocation);
Vue.use(VueMaterial);
Vue.use(FlagIcon);


Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
