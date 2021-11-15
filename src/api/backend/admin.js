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

// 删除管理员
export function delAdmin (ids) {
  return axios().post(
    baseUrl + '/admin/destroy',
    {
      ids
    })
}

// 编辑管理员
export function editAdmin (params) {
  return axios().post(
    baseUrl + '/admin/edit',
    params
  )
}
