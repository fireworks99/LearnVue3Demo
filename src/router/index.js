import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import Grid from '@/components/Grid/index.vue'
import Todo from '@/components/Todo/index.vue'
import CURD from '@/components/CURD/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/grid',
      name: 'grid',
      component: Grid
    },
    {
      path: '/todo',
      name: 'todo',
      component: Todo
    },
    {
      path: '/curd',
      name: 'curd',
      component: CURD
    },
  ]
})

export default router
