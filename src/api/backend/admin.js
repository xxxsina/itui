import axios from '@/api/axios'
import baseUrl from '@/api/baseUrl'

// 管理员列表
export function getAdminList (search, page) {
  return axios().post(
    baseUrl + '/admin',
    {
      search,
      page
    })
}

// 编辑管理员
export function editAdmin (params) {
  return axios().post(
    baseUrl + '/admin/edit',
    params
  )
}

// 销毁管理员
export function delAdmin (ids) {
  return axios().post(
    baseUrl + '/admin/destroy',
    {
      ids
    })
}

// 管理员日志列表
export function getAdminLogList (search, page) {
  return axios().post(
    baseUrl + '/adminLog',
    {
      search,
      page
    })
}

// 获取当前管理员信息
export function getAdminProfile () {
  return axios().post(
    baseUrl + '/admin/profile'
  )
}

// 当前管理员自我编辑
export function setAdminProfile (params) {
  return axios().post(
    baseUrl + '/admin/setProfile',
    params
  )
}
