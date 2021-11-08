import axios from '@/api/axios'
import baseUrl from '@/api/baseUrl'

// 用户名和密码登录
export function loginByUsername (username, password) {
  return axios().post(
    baseUrl + '/user/user/login',
    {
      username,
      password
    })
}

// 手机号和短信验证码登录
export function loginByMobile (mobile, smsCaptcha) {
  return axios().post(
    baseUrl + '/user/user/loginByMobile',
    {
      mobile,
      smsCaptcha
    })
}

// 登出
export function logout () {
  return axios().post(
    baseUrl + '/user/user/logout'
  )
}
