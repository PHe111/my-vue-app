
import axios from 'axios';
import { ElMessage } from 'element-plus';
import config from '../config';
const service = axios.create({
    baseURL:config.baseApi,
});
const NETWORK_ERROR = '网络错误,请稍后重试！';
// 添加响应拦截器
service.interceptors.request.use(function (config) {//从官网拿到的模板代码
    // 在发送请求之前做些什么
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
//axios 的拦截器可以理解成 **“接口请求 / 响应的‘门卫’”**—— 在请求发出去之前、或者响应返回之后，自动帮你做一些统一操作，不用每个接口都重复写代码。
//这里的res是Axios 响应拦截器中接收的 “响应对象”，作用是获取后端返回的完整响应数据。
//简单说：
//当后端接口返回数据时，Axios 会把整个响应（包含状态码、响应头、数据体等）包装成一个对象，这个对象就是res。
service.interceptors.response.use((res) => {
    //请求拦截器（service.interceptors.request.use）
    const {code,data,msg} = res.data;//解构赋值拿到后端返回的数据
    // 解构赋值==
    // const code=res.data.code;
    // const data=res.data.data;
    // const msg=res.data.msg;更简洁
    if(code === 200){
        return data;
    }else{
        //这里可以使用Element Plus的消息提示组件进行错误提示
        ElMessage.error(msg || NETWORK_ERROR );
        return Promise.reject(new Error(msg || NETWORK_ERROR));
    }
  });
  function request(options){
    options.method=options.method || "get";
    //正常来说返回值是一个Promise对象
    //工程化时要统一处理返回值
    if(options.method.toLowerCase() === "get"){
        options.params = options.data;
    }
    //对mock开关进行处理
    let isMock=config.mock;//全局mock开关
    if(typeof options.mock != "undefined"){//如果单个接口有mock配置
        isMock=options.mock;//用单个接口的mock配置覆盖全局mock开关
    }
    //针对环境进行处理
    if(config.env === "prod"){//生产环境
        service.defaults.baseURL=config.baseApi;//线上环境都用真实后端地址
    }else{//开发环境和测试环境 
        service.defaults.baseURL=isMock ? config.mockApi : config.baseApi;//
    }
    console.log('当前请求baseURL:', service.defaults.baseURL); // 新增日志
    console.log('请求完整地址:', service.defaults.baseURL + options.url); // 新增日志
    return service(options);
  }
  export default request;