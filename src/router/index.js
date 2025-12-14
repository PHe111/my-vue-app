import component from "element-plus/es/components/tree-select/src/tree-select-option.mjs"
import{createRouter,createWebHashHistory}from"vue-router"

const routes = [
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Login.vue')
    },
    {
      path: '/',
      name: 'main',
      component: () => import('@/views/Main.vue'),
      redirect: '/home',
      children:[
      ]
    },
    {
      path:'/:pathMatch(.*)*',
      name:'404',
      component:() => import ('@/views/404.vue')
    },
  ]

const router=createRouter({
  history:createWebHashHistory(),
  routes
})
export default router