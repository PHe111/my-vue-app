
<template>
<div class="goodsDetail" v-if="change">
  <button @click="closeDetail()">X</button>
  <div class="detail">
    <div>剩余商品：{{ currentItem.remainingQuantity }}</div>
    <div>卖出商品：{{ currentItem.sales }}</div>
    <div>销售额：{{ currentItem.price*currentItem.sales }}</div>
  </div>
  <div>
    <img :src="currentItem.imgUrl" alt="">
  </div>

</div>
<div class="allGoods">
  <div class="goods" v-for="item in allMall" @click="handleDetail(item)">
    <img :src="item.imgUrl" alt="">
      <h3>{{item.name}}</h3>
      <p>{{ item.spec }}</p>
      <div>
      <div>¥{{ item.price }}</div>
      </div>
      
  </div>
</div>
</template>
<script setup>
  import { close } from 'element-plus/es/components/notification/src/notify.mjs';
import { ref,getCurrentInstance,onMounted,reactive} from 'vue';
  const {proxy}=getCurrentInstance()
  const allMall=ref([])
  const getMallData=async()=>{
    const data=await proxy.$api.getMallData()
    allMall.value=data;
  }
  let change=ref(false)
  const currentItem=ref()
  function handleDetail(item){
    currentItem.value=item
    if(change.value==false){
      change.value=!change.value
    }
  }
  function closeDetail(){
    change.value=!change.value
  }
  onMounted(
    ()=>{
      getMallData()
    }
  )
  

</script>
<style scoped lang="less">
.allGoods{ 
  display:flex;
  align-items: center;
  flex-wrap: wrap;
}
.goods{
  height: 200px;
  width: 300px;
  background-color: rgb(255, 255, 255);
  border-radius: 10px;
  border: 1px black solid;
  padding: 10px;
  margin-left: 20px;
  margin-top: 20px;
  img{
    width: 75%;
    height: 75%;
  }
}
.goodsDetail{
  border-radius: 20px;
  position: fixed;
  height: 200px;
  width: 400px;
  background-color: aliceblue;
  margin:auto auto;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  border: 1px black solid; 
  img{
    width: 160px;
    height: 100px;
  }
  .detail{
    
    margin-top: 20px;
  }
  button{
    position:absolute;
    top: 5px;
    right: 5px;
  }
}
</style>
