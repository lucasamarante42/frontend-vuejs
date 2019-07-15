// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueMask from 'v-mask'
import Notify from 'vue2-notify'
import money from 'v-money'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faCoffee)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

import "@/assets/global.css"

Vue.use(VueMask)
Vue.use(Notify)
Vue.use(money, {precision: 2})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
