import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '@/pages/core/Login.vue';
import Error from '@/pages/core/Error.vue';
import Profile from '@/pages/core/Profile.vue';
import RegistrationForm from '@/pages/core/RegistrationForm.vue';
import Shops from '@/pages/core/Shops.vue';
import Dashboard from '@/pages/core/Dashboard.vue';

Vue.use(VueRouter)

  const routes = [
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard,
      meta: {
        breadcrumb: [
          { name: 'Dashboard', href: 'Dashboard' },
          { name: 'Dashboard' }
        ]
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        breadcrumb: [
          { name: 'Login', href: 'Login' },
          { name: 'Login' }
        ],
        allowAnonymous: true
      }
    },
    {
      path: '/error',
      name: 'Error',
      component: Error,
      meta: {
        allowAnonymous: true
      }
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
      meta: {
        breadcrumb: [
          { name: 'Profile', href: 'Profile' },
          { name: 'Profile' }
        ],
        allowAnonymous: false
      }
    },
    {
      path: '/registration',
      name: 'RegistrationForm',
      component: RegistrationForm,
      meta: {
        breadcrumb: [
          { name: 'RegistrationForm', href: 'RegistrationForm' },
          { name: 'RegistrationForm' }
        ],
        allowAnonymous: true
      }
    },
    {
      path: '/shops',
      name: 'Shops',
      component: Shops,
      meta: {
        breadcrumb: [
          { name: 'Shops', href: 'Shops' },
          { name: 'Shops' }
        ],
        allowAnonymous: true
      }
    },


]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
