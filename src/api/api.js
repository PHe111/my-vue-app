// 整个项目的api管理
import request from './request'
//请求首页左侧数据//封装
export default {
    getTableData(){
        return request({
            url:"/home/getTableData",
            method:"get",
            mock:true,
            //正常来说返回值是一个Promise对象
            //工程化时要统一处理返回值
        });
    },
    getCountData(){
        return request({
            url:"/home/getCountData",
            method:"get",
            mock:true,
        });
    },
    getChartData(){
        return request({
            url:"/home/getChartData",
            method:"get",
            mock:true,
        });
    },
    getUserData(data){
        return request({
            url:"/home/getUserData",
            method:"get",
            mock:true,
            data,
        });
    },
    deleteUserData(data){
        return request({
            url:"/user/deleteUserData",
            method:"get",
            mock:true,
            data,
        });
    },
    addUser(data){
        return request({
            url:"/user/addUser",
            method:"post",
            mock:true,
            data,
        });
    },
    editUser(data){
        return request({
            url:"/user/editUser",
            method:"post",
            mock:true,
            data,
        });
    },
    getMenu(params) {
        return request({
        url: '/permission/getMenu',
        method: 'post',
        data: params
        })
    },
}; 