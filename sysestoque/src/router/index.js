import Vue from 'vue'
import Router from 'vue-router'
import Products from '@/components/Products'
import ProductPage from '@/components/ProductPage'
import SellerPage from '@/components/SellerPage'
import WelcomePage from '@/components/WelcomePage'
import ClientPage from '@/components/ClientPage'
import ClientAddressPage from '@/components/ClientAddressPage'
import CategoriesPage from '@/components/CategoriesPage'
import OrderPage from '@/components/OrderPage'
import OrderItenPage from '@/components/OrderItenPage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/product',
      name: 'Products',
      component: Products
    },
    {
      path: '/product/:id',
      name: 'ProductPage',
      component: ProductPage
    },
    {
      path: '/seller',
      name: 'SellerPage',
      component: SellerPage
    },
    {
      path: '/',
      name: 'WelcomePage',
      component: WelcomePage
    },
    {
      path: '/client',
      name: 'ClientPage',
      component: ClientPage
    },
    {
      path: '/client-address',
      name: 'ClientAddressPage',
      component: ClientAddressPage
    },
    {
      path: '/categories',
      name: 'CategoriesPage',
      component: CategoriesPage
    },
    {
      path: '/order',
      name: 'OrderPage',
      component: OrderPage
    },
    {
      path: '/order-iten',
      name: 'OrderItenPage',
      component: OrderItenPage
    }

  ]
})
