import axios from '@/api/axios'
import baseUrl from '@/api/baseUrl'

// 列表
export function getAuthVipList () {
  return axios().post(
    baseUrl + '/authVip'
  )
}

// 编辑
export function editAuthVip (params) {
  return axios().post(
    baseUrl + '/authVip/edit',
    params
  )
}

// 删除
export function delAuthVip (ids) {
  return axios().post(
    baseUrl + '/authVip/del',
    {
      ids
    })
}
