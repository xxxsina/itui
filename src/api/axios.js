/* eslint-disable no-sequences */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
// import VueCookie from 'vue-cookie'
import store from '@/store'
import { getToken } from '@/utils/auth'

// 创建 axios 实例
let service = axios.create({
  withCredentials: true, // 设置跨域访问
  timeout: 500,
  headers: {
    'Content-Type': 'application/json;charset:utf-8'
  }
})

// 设置 post、put 默认 Content-Type
// service.defaults.headers.post['Content-Type'] = 'application/json'
// service.defaults.headers.put['Content-Type'] = 'application/json'

// 添加请求拦截器
service.interceptors.request.use(
  (config) => {
    if (config.method === 'post' || config.method === 'put') {
      // post、put 提交时，将对象转换为string, 为处理Java后台解析问题
      config.data = JSON.stringify(config.data)
    }
    // 请求发送前进行处理
    // console.log(store.getters.token)
    // header x-token
    if (store.getters.token) {
      config.headers['token'] = getToken()
    }
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
    // 这里是吧response对象里面的data取出来
    let { data } = response
    if (data.code !== 200 && data.code !== 1) {
      if (data.code === 10018) {
        // MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
        MessageBox.confirm(data.msg, '确定退出', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 刷新页面
          store.dispatch('Logout').then(() => {
            location.reload()// 为了重新实例化vue-router对象 避免bug
          })
        })
      } else if (data.code !== 201) {
        Message({
          message: data.msg,
          type: 'error',
          duration: 5 * 1000
        })
      }
      // 这里把服务器返回的数据以error形式返回
      return Promise.reject(data)
    } else {
      // 成功就返回数据，供业务判断及显示
      return data
    }
  },
  (error) => {
    if (error.response) {
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
