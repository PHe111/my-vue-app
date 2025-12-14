

<template>
    <div class="header">
        <div class="l-content">
            <el-button size="small" @click="handleCollapse">
                <component class="icons" is="Menu" />
            </el-button>
        <el-breadcrumb separator="/" class="bread">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item v-if="current" :to="current.path">{{ current.label }}</el-breadcrumb-item>
        </el-breadcrumb>        
        </div>
        <div class="r-content">
            <el-dropdown>
                <span class="el-dropdown-link">
                    <img :src="getImageUrl('user')"alt="图片没了" class="user"/>
                <el-icon class="el-icon--right">
                    <arrow-down />
                </el-icon>
                </span>
                <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item>个人中心</el-dropdown-item>
                    <el-dropdown-item @click="handleLoginOut">退出</el-dropdown-item>
                </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
</template>

<script setup>
import{ref,computed} from 'vue';
import{useAllDataStore}from'@/stores'
import { useRoute, useRouter } from 'vue-router';
const store=useAllDataStore()
//动态获取图片路径，让打包工具（Vite）正确识别并处理这个动态图片的路径
//URL（组合当前路径和图片路径）返回的是对象，需要使用 .href 获取字符串路径
const getImageUrl = (user)=>{
    return new URL(`../assets/images/${user}.png`,import.meta.url).href;
}
const handleCollapse=()=>{
    store.state.isCollapse=!store.state.isCollapse
}
const router=useRouter()
const handleLoginOut=()=>{
    store.clean()
    router.push('/login')
}
const current=computed(()=>store.state.currentMenu)
</script>

<style lang="less" scoped>
.header{
    display:flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 100%;
    background-color:#333;
}
.icons{
    width: 20px;
    height: 20px;
}
.l-content{
    display: flex;
    align-items: center;
    .el-button{
        margin-right: 20px; 
    }
}
.r-content{
    .user{
        width: 40px;
        height: 40px;
        border-radius: 50%;
    }
}
</style>
