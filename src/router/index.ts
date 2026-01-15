import { createRouter, createWebHistory, RouterView } from 'vue-router'
import HomePage from '@/pages/HomePage.vue'
import PrivacyPolicy from '@/pages/PrivacyPolicy.vue'
import TermsOfService from '@/pages/TermsOfService.vue'

const routes = [
  {
    path: '/:lang(fr|ar)?',
    component: RouterView,
    children: [
      {
        path: '',
        name: 'home',
        component: HomePage,
      },
      {
        path: 'privacy',
        name: 'privacy',
        component: PrivacyPolicy,
      },
      {
        path: 'terms',
        name: 'terms',
        component: TermsOfService,
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
      }
    }
    return { top: 0 }
  },
})

export default router
