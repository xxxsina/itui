import axios from '@/api/axios'
import baseUrl from '@/api/baseUrl'

// 列表
export function getAuthGroupList (page) {
  return axios().post(
    baseUrl + '/authGroup',
    {
      page
    }
  )
}

// 编辑
export function editAuthGroup (params) {
  return axios().post(
    baseUrl + '/authGroup/edit',
    params
  )
}

// 删除
export function delAuthGroup (ids) {
  return axios().post(
    baseUrl + '/authGroup/destroy',
    {
      ids
    })
}
