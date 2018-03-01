import Vue from 'vue'
import Router from 'vue-router'
import Products from '@/components/Products'
import Product from '@/components/Product'
import Calculator from '@/components/Calculator'
import ProductsTable from '@/components/ProductsTable'
import BasketsTable from '@/components/BasketsTable'
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
      path: '/baskets/create',
      name: 'baskets-create',
      component: Basket
    },
    {
      path: '/products/:id/edit',
      name: 'product',
      component: Product
    },
    {
      path: '/baskets/:id/edit',
      name: 'basket',
      component: Basket
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
      // name: 'baskets_base',
      component: Calculator,
      children: [
        {
          path: '',
          name: 'baskets',
          component: BasketsTable
        },
        {
          path: ':page',
          name: 'baskets-page',
          component: BasketsTable
        }
      ]
    }
  ]
})
