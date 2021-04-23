import axios from 'axios'
import { Toast } from 'vant'
import locStorage from 'utils/storage/locStorage'
import router from '../router'
export const request = config => {
  const inst = axios.create({
    baseURL: '/api/v4',
    timeout: 5000
  })
  // 请求拦截
  inst.interceptors.request.use(config => {
    config.headers.authorization = locStorage.get('token');
    Toast.loading({
      message: "加载中...",
      loadingType: 'spinner',
      forbidClick: true,
      duration: 0
    })
    return config
  })
  //响应拦截
  inst.interceptors.response.use(data => {
    Toast.clear();
    if(data.data.errcode === 90101) {
      router.push('/login');
    }
    return data.data
  })
  return inst(config).catch(err => {
    Toast({
      message: '当前网络状态较差'
    });
  })
}