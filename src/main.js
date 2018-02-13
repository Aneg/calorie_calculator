// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from '@/store/store'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)
Vue.http.headers.common['Access-Control-Allow-Origin'] = 'http://127.0.0.1:8000'
Vue.http.headers.common['Access-Control-Request-Method'] = '*'

Vue.config.productionTip = false

Vue.filter('fixedone', function (value) {
  return value.toFixed(1)
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
