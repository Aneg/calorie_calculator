import Vue from 'vue'
import Router from 'vue-router'
import Products from '@/components/Products'
import Product from '@/components/Product'
import ProductsTable from '@/components/ProductsTable'
import Baskets from '@/components/Baskets'
import Basket from '@/components/Basket'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
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
      path: '/baskets',
      name: 'baskets',
      component: Baskets
    },
    {
      path: '/baskets/create',
      name: 'baskets-create',
      component: Basket
    },
    {
      path: '/baskets/:page',
      name: 'baskets-page',
      component: Baskets
    },
    {
      path: '/baskets/:id/edit',
      name: 'basket',
      component: Basket
    }
  ]
})
