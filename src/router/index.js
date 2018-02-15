import Vue from 'vue'
import Router from 'vue-router'
import Products from '@/components/Products'
import Product from '@/components/Product'
import Calculator from '@/components/Calculator'
import ProductsTable from '@/components/ProductsTable'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/products',
      component: Products,
      children: [
        {
          path: '',
          name: 'products',
          component: ProductsTable
        },
        {
          path: ':page',
          name: 'products-page',
          component: ProductsTable
        }
      ]
    },
    {
      path: '/products/create',
      name: 'create',
      component: Product
    },
    {
      path: '/products/:id/edit',
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
