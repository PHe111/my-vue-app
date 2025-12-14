import { createApp } from 'vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import '@/assets/less/index.less'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import {createPinia}from'pinia'
import "@/api/mock.js"
import api from "@/api/api"
import{useAllDataStore}from "@/stores"

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.config.globalProperties.$api=api;
//在 Vue 初始化的时候，把这个api对象 “全局挂载” 到了 Vue 实例上（比如app.config.globalProperties.$api = api）
const pinia = createPinia()
app.use(pinia)
const store=useAllDataStore();
app.use(ElementPlus)
store.addMenu(router,"refresh")
app.use(router)
function isRoute(to){
  let res=router.getRoutes();
  let resFil=res.filter((item)=>item.path===to.path);
  return resFil.length>0;
}
router.beforeEach((to,from)=>{
  if(to.path!=='/login'&&!store.state.token){
    return{name:"login"}
  }
  if(!isRoute(to)){
    return{name:"404"}
  }
})
app.mount('#app')