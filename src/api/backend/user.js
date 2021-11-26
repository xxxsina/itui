import axios from '@/api/axios'
import baseUrl from '@/api/baseUrl'

// 用户日志列表
export function getUserLogList (search, page) {
  return axios().post(
    baseUrl + '/userLog',
    {
      search,
      page
    }
  )
}

// 列表
export function getUserList (search, page) {
  return axios().post(
    baseUrl + '/user',
    {
      search,
      page
    }
  )
}

// 编辑
export function editUser (params) {
  return axios().post(
    baseUrl + '/user/edit',
    params
  )
}

// 销毁
export function delUser (ids) {
  return axios().post(
    baseUrl + '/user/destroy',
    {
      ids
    })
}

// 设置vip
export function setVip (params) {
  return axios().post(
    baseUrl + '/user/setVip',
    params
  )
}
