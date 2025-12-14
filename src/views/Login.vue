<script setup>
import { useAllDataStore } from '../stores'
import {reactive,getCurrentInstance}from 'vue'
import { useRouter } from 'vue-router'
const loginForm=reactive({
  username:'',
  password:''
})
const {proxy} = getCurrentInstance()
const store=useAllDataStore()
const handleLogin=async()=>{
  const res=await proxy.$api.getMenu(loginForm)
  console.log(res);
  store.updateMenuList(res.menuList)
  store.state.token=res.token
  store.addMenu(router) 
  router.push('/home')
  console.log('所有已注册路由：', router.getRoutes().map(r => r.path));
}
const router=useRouter()
</script>

<template>
  <div class="body-login">
      <el-form :model="loginForm" class="login-container">
        <h1>欢迎登录</h1>
        <el-form-item>
          <el-input type="input" placeholder="请输入账号" v-model="loginForm.username">
          </el-input>
          <el-input type="password" placeholder="请输入密码" v-model="loginForm.password">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleLogin">登录</el-button>
        </el-form-item>
      </el-form>
  </div>
</template>

<style scoped lang="less">
.body-login{
  width: 100%;
  height: 100%;
  background-image:url("..\assets\images\background.png");
  background-size: 100%;
  overflow: hidden;
}
.login-container{
  width: 400px;
  background-color: #fff;
  border:1px solid #eaeaea;
  border-radius:15px ;
  padding: 35px 35px 15px 35px;
  box-shadow: 0 0 25px #cacaca;
  margin: 250px auto;
  h1{
    text-align: center;
    margin-bottom:20px ;
    color: #505450;
  }
}
// 仅在 scoped 样式中需要：
// 如果 <style> 没有加 scoped，直接写选择器即可，无需深度选择器
:deep(.el-form-item__content){
  justify-content: center;
}

</style>
