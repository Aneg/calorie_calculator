// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from '@/store/store'

// import VueRouter from 'vue-router'
// import routes from '@/routers'

// Vue.use(VueRouter)
// const router = new VueRouter({
//   mode: 'history',
//   routes
// });

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
