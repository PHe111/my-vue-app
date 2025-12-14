
<template>
    <el-aside :width="width">
      <el-menu
        style="background-color: #545c64;"
        text-color="#fff"
        :collapse="isCollapse"
        :collapse-transition="false"
        router
        :default-active="activeMenu"
      > 
      <h3 v-show="isCollapse">后台</h3>
      <h3 v-show="!isCollapse">通用后台管理系统</h3>
        <el-menu-item
        v-for="item in noChildren"
        :index="item.path"
        :key="item.path"
        @click="handleMenu(item)"
        >
        <!-- 选择组件:is="组件库中的名字查官方文档" -->
          <component class="icons" :is="item.icon"></component>
          <span>{{ item.label }}</span>
        </el-menu-item>
        <el-sub-menu
        v-for="item in hasChildren"
        :index="item.path"
        :key="item.path"
        >    
          <template #title>
          <component class="icons" :is="item.icon"></component>
          <span>{{ item.label }}</span>    
          </template>
          <el-menu-item-group
          style="background-color: #545c64;"
          >
            <el-menu-item
                v-for="(subItem,subIndex) in item.children"
                :index="subItem.path"
                :key="subItem.path" 
                @click="handleMenu(subItem)"
            >
          <component class="icons" :is="subItem.icon"></component>
          <span>{{ subItem.label }}</span>                
        </el-menu-item>
          </el-menu-item-group>
          </el-sub-menu>
      </el-menu>
    </el-aside>
</template>
<script setup>

import { ref,computed } from 'vue';
import{useAllDataStore}from'@/stores'
import { useRoute } from 'vue-router';
const store=useAllDataStore()
const isCollapse=computed(()=>store.state.isCollapse)
const width=computed(()=>store.state.isCollapse?'64px':'180px')


const list=computed(()=>store.state.menuList)
/* filter() 筛选函数符合条件的元素 */
const noChildren = computed(() => list.value.filter(item => !item.children));
const hasChildren = computed(() => list.value.filter(item => item.children));
const route = useRoute()
const activeMenu = computed(()=>route.path)
const handleMenu=(item)=>{
    console.log('当前点击的item：', item)
    store.selectMenu(item)
}
</script>
<style scoped lang="less">
.icons{
    width: 18px;
    height: 18px;
    margin-left: 5px;
}
.el-menu{
    border-right: none;
    h3{
        line-height: 48px;
        color:#fff;
        text-align: center;
    }
}
.el-aside{
    background-color: #545c64;
    height: 100%;;
}
</style>
