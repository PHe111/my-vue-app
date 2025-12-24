
import{defineStore}from'pinia'
//Pinia 的 defineStore 会自动处理 ref 包裹的状态—— 在访问 store.state 时，
// Pinia 会帮你自动解包 ref，所以 store.state 本质是一个响应式对象（类似 reactive 包裹的结果）。
import { ref,watch } from "vue"
function initState(){
    return{
        isCollapse:false,
        tags:[
        {
            path:"/home",
            name:'home',
            label:'首页',
            icon:'home'
        }
    ],
        currentMenu:null,
        menuList:[],
        token:"",
        routerList:[],
    }
}
export const useAllDataStore=defineStore('allData',()=>{
    const state=ref(initState())
    watch(state,(newObj)=>{
        if(!newObj.token)return;
        localStorage.setItem("store",JSON.stringify(newObj))},
        {deep:true})
    function selectMenu(val){
        if(val.name==='home'){
            state.value.currentMenu=null;
        }else{
            state.value.currentMenu=val;
            let index = state.value.tags.findIndex(item=>item.name===val.name)
            index===-1?state.value.tags.push(val):"";
        }
    }
    function updateTags(tag){
        let index =state.value.tags.findIndex(item=>item.name===tag.name)
        state.value.tags.splice(index,1)
    }
    function updateMenuList(val){
        state.value.menuList=val;
    }
    function addMenu(router,type){
        if(type==='refresh'){//刷新时使用之前储存的本地数据
            if(JSON.parse(localStorage.getItem('store'))){
                state.value=JSON.parse(localStorage.getItem('store'))
                //
                state.value.routerList=[];
            }else{
                return;
            }
        }
        const menu=state.value.menuList;
        const module=import.meta.glob('../views/**/*.vue')
//import.meta.glob 是 Vite 内置的 API，作用是：
//根据你传入的「文件路径匹配规则」，批量找到项目中符合规则的文件
// ，并返回一个「键为文件路径、值为该文件动态导入函数」的对象。
        const routeArr=[]
        //处理后端传入的菜单转化成前端路由
        menu.forEach(item=>{
            if(item.children){
                item.children.forEach(val=>{
                    let url=`../views/${val.url}.vue`
                    val.component=module[url];
                    //component渲染组件页面
                    routeArr.push(...item.children)
                })
            }else{
                let url=`../views/${item.url}.vue`
                item.component=module[url];
                routeArr.push(item)
            }
        })
        let routers=router.getRoutes()
        routers.forEach(item=>{
            if(item.name=='main'||item.name=='login'||item.name=='404'){
                return
            }else{
                router.removeRoute(item.name)
            }
        })
        routeArr.forEach((item)=>{//将路由注册到main路由下
            state.value.routerList.push(router.addRoute("main",item));//返回值是一个函数
        })
//当你调用 router.addRoute(parentName, routeConfig) 动态注册一个路由时，
// Vue Router 会返回一个函数（比如叫 removeRouteFn）；
//后续只要调用这个返回的函数（removeRouteFn()），
// 就能直接移除对应的动态路由，无需再通过 router.removeRoute(routeName) 
// 手动指定名称。
        
    }
    function clean(){
        state.value.routerList.forEach((item)=>{
            if(item)item();
        });
        state.value=initState();
        localStorage.removeItem('store')
    }
    
    return{
        state,selectMenu,updateTags,updateMenuList,addMenu,clean
    }
})