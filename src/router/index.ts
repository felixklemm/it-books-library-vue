import { createRouter, createWebHistory } from 'vue-router'
import Index from '../views/Index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'books',
      component: Index
    },
    {
      path: '/book/:isbn',
      name: 'book-detail',
      component: () => import('../views/Detail.vue') // lazy loading
    },
    {
      path: '/favorites',
      name: 'favorites',
      component: () => import('../views/Favorites.vue') // lazy loading
    }
  ],
  linkExactActiveClass: 'mainnav-link--active'
})

export default router
