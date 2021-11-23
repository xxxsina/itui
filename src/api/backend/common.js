import axios from '@/api/axios'
import baseUrl from '@/api/baseUrl'

// 获取权限组
export function getAuthGroup () {
  return axios().post(
    baseUrl + '/getAuthGroup'
  )
}

// 获取有效期
export function getPeriodConfig () {
  return axios().post(
    baseUrl + '/getPeriodConfig'
  )
}

// 获取短连接
export function getShortHostsConfig () {
  return axios().post(
    baseUrl + '/getShortHostsConfig'
  )
}

// 获取vip
export function getVipConfig () {
  return axios().post(
    baseUrl + '/getVipConfig'
  )
}
