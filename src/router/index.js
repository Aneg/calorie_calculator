import Vue from 'vue'
import Router from 'vue-router'
import Products from '@/components/Products'
import Product from '@/components/Product'
import Calculator from '@/components/Calculator'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/products',
      name: 'products',
      component: Products
    },
    {
      path: '/products/create',
      name: 'create',
      component: Product
    },
    {
      path: '/products/:id',
      name: 'product',
      component: Product
    },
    {
      path: '/calculator',
      name: 'calculator',
      component: Calculator
    }
  ]
})
