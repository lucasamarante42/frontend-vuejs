import Vue from 'vue'
import Router from 'vue-router'
import Products from '@/components/Products'
import ProductPage from '@/components/ProductPage'
import SellerPage from '@/components/SellerPage'
import WelcomePage from '@/components/WelcomePage'
import ClientPage from '@/components/ClientPage'
import ClientAddressPage from '@/components/ClientAddressPage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
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
      path: '/welcome',
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
    }
  ]
})
