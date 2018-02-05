import Vue from 'vue'
import Router from 'vue-router'
import Products from '@/components/Products'
import Calculator from '@/components/Calculator'

Vue.use(Router)

export default new Router({
  model: 'history',
  routes: [
    {
      path: '/products',
      name: 'products',
      component: Products
    },
    {
      path: '/',
      name: 'calculator',
      component: Calculator
    }
  ]
})
