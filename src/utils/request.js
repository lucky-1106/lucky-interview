import axios from 'axios'
import { Toast } from 'vant'

// 创建一个发送请求的副本
const instance = axios.create({
  // 基地址
  baseURL: process.env.VUE_APP_BASEURL
})

// Add a request interceptor 添加请求拦截器
instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

// Add a response interceptor 添加响应拦截器
instance.interceptors.response.use(
  function (response) {
    // Do something with response data
    if (response.data.code !== 200) {
      return Toast.fail(response.data.message)
    }
    return response.data
  },
  function (error) {
    // Do something with response error
    return Promise.reject(error)
  }
)

export default instance
