import homeApi from './mockData/home'
import Mock from 'mockjs';
//1拦截的路径 2"请求方式" 3制造的假数据
console.log("Mock配置已加载,规则已注册");
import userApi from './mockData/user'
import menuApi from './mockData/permission'
import mallApi from './mockData/mall'
Mock.mock(/api\/home\/getTableData/,"get",homeApi.getTableData)
Mock.mock(/api\/home\/getCountData/,"get",homeApi.getCountData)
Mock.mock(/api\/home\/getUserData/,"get",userApi.getUserList)
Mock.mock(/api\/user\/deleteUserData/,"get",userApi.deleteUser)
Mock.mock(/api\/user\/addUser/,"post",userApi.createUser)
Mock.mock(/api\/user\/editUser/,"post",userApi.updateUser)
Mock.mock(/api\/permission\/getMenu/,"post",menuApi.getMenu)
Mock.mock(/api\/mall\/getMallData/,"get",mallApi.getMallData)