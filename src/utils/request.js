// 请求模块
import axios from 'axios'
import store from '@/store'

const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/' // 接口的基准路径
})

// 请求拦截器
request.interceptors.request.use(function (config) {
  // 请求发情会经过这里
  // config：本次请求的配置对象
  const { user } = store.state
  if (user && user.token) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  console.log(config)
  // 这里记得返回 config ，否则请求就停在这里了
  return config
}, function (error) {
  // 如果请求出错了，会进入这里
  return Promise.reject(error)
})

// 响应拦截器

export default request
