import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import store from './config/store'
import './plugins/axios'
import './plugins/bootstrap-vue'
import App from './App.vue'
import './config/msg.js'
import './plugins/fontawesome'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'

Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)


Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
