import Vue from 'vue'
import Constants from '../boot/constants'

const isAuthorized = () => {
  return new Promise((resolve, reject) => {
    const waitToPopulate = (delay = 30) => {
      const status = Vue.prototype.$store.getters['user/getStatus']
      if (status) resolve(status)
      else setTimeout(waitToPopulate, delay)
    }
    waitToPopulate()
  })
}

const routes = [
  {
    path: '/',
    redirect: { name: 'auth' }
  },
  {
    path: '/auth',
    component: () => import('layouts/AuthLayout.vue'),
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem(Constants.token)) next({ name: 'home' })
      else next()
    },
    children: [
      { path: '/', name: 'auth', component: () => import('pages/Login.vue') }
    ]
  },
  {
    path: '/home',
    component: () => import('layouts/MainLayout.vue'),
    beforeEnter: async (to, from, next) => {
      try {
        if (!localStorage.getItem(Constants.token)) next({ name: 'auth' })
        else {
          const status = isAuthorized()
          if (status !== Constants.authorized) {
            localStorage.removeItem(Constants.token)
            next({ name: 'auth' })
          } else { next() }
        }
      } catch (e) {
        console.error(e)
      }
    },
    children: [
      { path: '/', name: 'home', component: () => import('pages/Index.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
