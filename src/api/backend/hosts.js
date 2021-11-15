import axios from '@/api/axios'
import baseUrl from '@/api/baseUrl'

// 列表
export function getHostsList () {
  return axios().post(
    baseUrl + '/hosts'
  )
}

// 编辑
export function editHosts (params) {
  return axios().post(
    baseUrl + '/hosts/edit',
    params
  )
}

// 删除
export function delHosts (ids) {
  return axios().post(
    baseUrl + '/hosts/destroy',
    {
      ids
    })
}
