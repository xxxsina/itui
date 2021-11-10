/* eslint-disable no-sequences */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import VueCookie from 'vue-cookie'
import store from '@/store'
import { getToken } from '@/utils/auth'

// 创建 axios 实例
let service = axios.create({
  withCredentials: true,
  timeout: 500
})

// 设置 post、put 默认 Content-Type
service.defaults.headers.post['Content-Type'] = 'application/json'
// service.defaults.headers.put['Content-Type'] = 'application/json'

// 添加请求拦截器
service.interceptors.request.use(
  (config) => {
    if (config.method === 'post' || config.method === 'put') {
    //   // post、put 提交时，将对象转换为string, 为处理Java后台解析问题
      config.data = JSON.stringify(config.data)
    }
    console.log('=================')
    console.log(config)
    console.log('=================')
    // 请求发送前进行处理
    // console.log(store.getters.token)
    // header x-token
    // if (store.getters.token) {
    //   config.headers['token'] = getToken()
    // } else {
    //   // eslint-disable-next-line no-undef
    //   let token = VueCookie.get('token')
    //   config.headers.token = token
    // }
    // let companycode = VueCookie.get('companycode')
    // config.headers.companycode = companycode || 'k9monpgAzv2zNJKZYdOy'
    return config
  },
  (error) => {
    // 请求错误处理
    return Promise.reject(error)
  }
)

// 添加响应拦截器
service.interceptors.response.use(
  (response) => {
    let { data } = response
    if (data.code !== 200 && data.code !== 1) {
      if (data.code === 10018) {
        // MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
        MessageBox.confirm(data.message, '确定退出', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.dispatch('FedLogOut').then(() => {
            location.reload()// 为了重新实例化vue-router对象 避免bug
          })
        })
      } else {
        Message({
          message: data.message,
          type: 'error',
          duration: 5 * 1000
        })
        // eslint-disable-next-line prefer-promise-reject-errors
        return Promise.reject('error')
      }
    } else {
      return data
    }
  },
  (error) => {
    if (error.response) {
      // console.log('-------3--------')
      // console.log(error.response)
      // eslint-disable-next-line one-var
    //   let info = {},
    //     { status, statusText, data } = error.response

    //   if (!error.response) {
    //     info = {
    //       code: 5000,
    //       msg: 'Network Error'
    //     }
    //   } else {
    //     // 此处整理错误信息格式
    //     info = {
    //       code: status,
    //       data: data,
    //       msg: statusText
    //     }
    //   }
    // } else {
    //   let info = {
    //     code: 0,
    //     msg: error.message
    //   }
    //   return info
      Message({
        message: error.message,
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject(error)
    }
  }
)

/**
 * 创建统一封装过的 axios 实例
 * @return {AxiosInstance}
 */
export default function () {
  return service
}
