// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueMask from 'v-mask'
import Notify from 'vue2-notify'

Vue.config.productionTip = false

Vue.use(VueMask)
Vue.use(Notify)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
