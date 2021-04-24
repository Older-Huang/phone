import { request } from './request'
import Vue from 'vue'
import {VueJsonp} from 'vue-jsonp'
Vue.use(VueJsonp)
//请求数据的api接口
// 商品分页与搜索
export const reqProductsData = options => request({url: '/product/pagination', method: 'get', params: options});

// 商品详情
export const reqProductDetail = id => request({url: '/product', method: 'get', params: id});

// 用户登录/注册
export const userLogin = options => request({url: '/user/signin', method: 'post', data: options });

// 获取用户信息对象
export const reqUserInfo = () => request({url: '/user/info', method: 'get'});

// 收藏
export const createLike = id => request({url: '/product_like/create', method: 'post', data: id});

// 取消收藏
export const deleteLike = id => request({url: '/product_like/delete', methos: 'get', params: id});

// 获取购物车
export const reqCartAll = () => request({url: '/cart/all', method: 'get'});

// 单个商品更新购物车&加入购物车
export const updateCart = options => request({url: '/cart/update', method: 'post', data: options});

// 删除购物车商品
export const deleteCart = id => request({url: "/cart/delete", method: 'get', params: id});

// 新增用户收货地址
export const createUserAddr = options => request({url: '/user_address/create', method: 'post', data: options});

// 删除用户收货地址
export const deleteUserAddr = id => request({url: '/user_address/delete', method: 'get', params: id});

// 修改用户收货地址
export const updateUserAddr = options => request({url: '/user_address/update', method: 'post', params: options.id, data: options.data});

// 下单
export const createOrder = options => request({url: '/order/create', method: "post", data: options});

// 获取单个订单
export const reqOrder = id => request({url: '/order', method: 'get', params: id});

// 付款
export const payOrder = options => request({url: '/order/pay', method: 'post', data: options.password, params: options.id});

// 订单分页与搜索
export const paginationOrder = options => request({url: '/order/pagination', method: 'get', params: options});

// 修改用户昵称
export const setUserNickName = name => request({url: '/user/setting', method: 'post', data: name});

// 上传用户头像
export const upLoadUserAvatar = data => request({url: "/user/avatar", method: 'post', data});

// 修改用户登录密码
export const updataUserPassword = data => request({url: '/user/updatePassword', method: 'post', data});

// 修改用户支付密码
export const updataUserPayPassword = data => request({url: '/user/updatePayPassword', method: 'post', data});

// 获取带字母排序的城市列表
export const reqCityData = () => request({url: '/data/city', method: 'get'});

// 获取地理定位信息对象
export const reqCityLocation = (latitude = 37.3986039, longitude = -121.9643745) => Vue.prototype.$jsonp(`http://api.map.baidu.com/geocoder/v2/?ak=C93b5178d7a8ebdb830b9b557abce78b&callback=renderReverse&location=${latitude},${longitude}`);
