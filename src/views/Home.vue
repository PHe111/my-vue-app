<script setup>
  import { ref,getCurrentInstance,onMounted,reactive} from 'vue';
 // $api是之前全局挂载到 Vue 实例上的要访问就得先拿到当前组件实例对象
  //获取当前组件实例对象（数据方法实例等）
  import * as echarts from 'echarts';// 不可改写echarts
  const {proxy}=getCurrentInstance()
  const getImageUrl=(user)=>{
      return new URL(`../assets/images/${user}.png`,import.meta.url).href;
  }
  const tableData = ref([
])
  const countData =ref([
  ])
  const chartData=ref([])

  const tableLabel = ref({
    name: "课程",
    todayBuy: "今日购买",
    monthBuy: "本月购买",
    totalBuy: "总购买",
})
const observer=ref(null);
  //这个是折线图和柱状图 两个图表共用的公共配置
  //echarst图表配置项
const xOptions = reactive({
      // 图例文字颜色
      textStyle: {
        color: "#333",
      },
      legend: {},
      grid: {
        left: "20%",
      },
      // 提示框
      tooltip: {
        trigger: "axis",
      },
      xAxis: {
        type: "category", // 类目轴
        data: [],
        axisLine: {
          lineStyle: {
            color: "#17b3a3",
          },
        },
        axisLabel: {
          interval: 0,
          color: "#333",
        },
      },
      yAxis: [
        {
          type: "value",
          axisLine: {
            lineStyle: {
              color: "#17b3a3",
            },
          },
        },
      ],
      color: ["#2ec7c9", "#b6a2de", "#5ab1ef", "#ffb980", "#d87a80", "#8d98b3"],
      series: [],
})

const pieOptions = reactive({
  tooltip: {
    trigger: "item",
  },
  legend: {},
  color: [
    "#0f78f4",
    "#dd536b",
    "#9462e5",
    "#a6a6a6",
    "#e1bb22",
    "#39c362",
    "#3ed1cf",
  ],
  series: []
})

    //先写假数据，等后端接口完成后再改
    //用mockjs拦截并提供数据
    const getTableData=async()=>{
      const data=await proxy.$api.getTableData()
      tableData.value=data.tableData
      // console.log('tableData',tableData.value,data);
    }
    const getCountData=async()=>{
      const data=await proxy.$api.getCountData()
      countData.value=data
      // console.log('countData',data);
    }
    const getChartData=async()=>{
      const {orderData,userData,videoData}=await proxy.$api.getChartData()
      //对第一个图标x轴和series赋值
      xOptions.xAxis.data=orderData.date
      xOptions.series=Object.keys(orderData.data[0]).map(val=>(
        {
          name:val,
          type:'line',
          data:orderData.data.map(item=>item[val]),
        }
      ))
      const oneEchart=echarts.init(proxy.$refs['echart'])
      //$refs 是用来获取模板中通过 ref 绑定的 DOM 元素的引用。
      oneEchart.setOption(xOptions);//对第1个图表series赋值
      
      //对表格渲染·
      xOptions.xAxis.data=userData.map(item=>item.date)
      xOptions.series=[
        {
        name:'新增用户',
        data:userData.map(item=>item.new),
        type:'bar',
        },
        {
        name:'活跃用户',
        data:userData.map(item=>item.active),
        type:'bar',
        }        
      ]
      const twoEchart=echarts.init(proxy.$refs['userEchart'])
      twoEchart.setOption(xOptions);//对第2个图表series赋值
      
      //对饼图渲染
      pieOptions.series=[
        {
          data:videoData,
          type:'pie',
        }
      ]
      const threeEchart=echarts.init(proxy.$refs['videoEchart'])
      threeEchart.setOption(pieOptions);//对第3个图表series赋值
      observer.value=new ResizeObserver((en)=>{
        oneEchart.resize();
        twoEchart.resize();
        threeEchart.resize();//resize()echart内置方法，重置图表大小
      })
      //容器存在
      if(proxy.$refs['echart']){
        observer.value.observe(proxy.$refs['echart'])
      }
    }

    onMounted(()=>{
      //在组件里，通过proxy.$api就能直接拿到这个全局的接口对象，然后调用getTableData()发起请求
      console.log('开始调用');
      getTableData()
      getCountData()
      getChartData()
      console.log('返回');
    })
</script>

<template>
    <el-row class="home" :gutter="20">
    <el-col :span="8" style="margin-top: 20px;">
      <el-card shadow="hover">
        <div class="user">
          <img :src="getImageUrl('user')" class="user"/>
          <div class="user-info">
            <p style="font-size: 30px;">用户名</p>
            <p style="color: #999;">管理员</p>
          </div>
        </div>
        <div class="login-info">
          <p>上次登录时间<span>2024-02-02</span></p>
          <p>上次登录地点<span>广东</span></p>
        </div>
      </el-card>

      <el-card shadow="hover" class="user-table">
        <el-table :data="tableData">
          <el-table-column 
          v-for="(val,key) in tableLabel"
          :key="key"
          :prop="key"
          :label="val"
          >
<!-- val：对象的属性值，key：对象的属性名（键名） -->
          </el-table-column>
        </el-table>
      </el-card>
    </el-col>
    <el-col :span="16" style="margin-top: 0;">
      <div class="num">
        <el-card
          :body-style="{display:'flex',padding:0}"
          v-for="item in countData"
          :key="item.name"
          >
          <component :is="item.icon" class="icons" :style="{background:item.color}"></component>
          <div class="detail">
            <p class="num">￥{{ item.value }}</p>
            <p class="txt">￥{{ item.name }}</p>
          </div>
        </el-card>
      </div>
    <el-card class="top-echart">
      <div ref="echart" style="height:280px;"></div>
    </el-card>
    <div class="graph">
        <el-card>
        <div ref="userEchart" style="height:240px;"></div>
      </el-card>
      <el-card>
        <div ref="videoEchart" style="height:240px;"></div>
      </el-card>
    </div>
        
    </el-col>

  </el-row>
</template>
<style scoped lang="less">
  .home{
    height:100%;
    overflow:hidden;
    .user{
      display: flex;
      align-items: center;
      border-bottom: 1px solid #ccc;
      margin-bottom: 20px;
      img{
        width: 150px;
        height: 150px;
        border-radius: 50%;
        margin-right: 40px;
      };
    };
    .user-info{
      p{
        line-height: 40px;
      }
    }

  }
  .login-info{
    p{
      line-height: 30px;
      font-size: 14px;
      color: #999;
      span{
        color: #666;
        margin-left: 60px;
      }
    }
  }
  .user-table{
    margin-top: 20px;
  }
  .num{
    display: flex;
    flex-wrap: wrap;//自动换行
    justify-content: space-between;
    .el-card{
      width: 32%;
      margin-top: 20px;
    }
    .icons{
      width: 80px;
      height: 80px;
      font-size: 30px;
      text-align: center;
      line-height: 80px;
      color: #fff;
    }
    .detail{
      margin-left: 15px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      .num{
        font-size: 30px;
        margin-bottom: 10px;
      }.txt{
        font-size: 15px;
        text-align: center;
        color: #999;
      }
      
    }
  }
  .graph{
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    .el-card{
      width: 48%;
      height: 260px;
    }
  }
</style>
