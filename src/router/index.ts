import { createRouter, createWebHistory } from 'vue-router'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path:'',
      redirect:'/login',
    },
    {
      path:'/login',
      component:()=>import('../views/login.vue')
    },
    {
      path:'/my',
      component:()=>import('../views/wode.vue')
    },
  ]
})

export default router
