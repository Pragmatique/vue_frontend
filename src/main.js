import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import Vuetify from "vuetify"
import "vuetify/dist/vuetify.min.css"
//import 'material-design-icons-iconfont/dist/material-design-icons.css'
//import 'material-design-icons'
import swatches from 'vue-swatches';
import "vue-multiselect/dist/vue-multiselect.min.css"
Vue.component('swatches', swatches)


import { setupComponents } from './config/setup-components'
setupComponents(Vue)
Vue.use(Vuetify)


Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
