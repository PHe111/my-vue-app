//先检查 Vite 提供的 import.meta.env.MODE 是否有值
// （比如执行 npm run dev 时，它的值是 development）；
const env=import.meta.env.MODE||'prod';
const EnvConfig = {
    development:{
        baseApi:"/api",//后端接口地址
        mockApi:'https://mock.apifox.cn/m1/4068509-0-default/api'//mock假数据接口
    },
    test:{
        baseApi:"/test.future.com/api",
        mockApi:'https://mock.apifox.cn/m1/4068509-0-default/api'
    },
    prod:{
        baseApi:"/future.com/api",
        mockApi:'https://mock.apifox.cn/m1/4068509-0-default/api'
    },
}
export default {
    env,
    ...EnvConfig [env],
    mock: false//是否开启mock假数据
}