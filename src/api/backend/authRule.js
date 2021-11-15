import axios from '@/api/axios'
import baseUrl from '@/api/baseUrl'

// 列表
export function getAuthRuleList () {
  return axios().post(
    baseUrl + '/authRule'
  )
}

// 编辑
export function editAuthRule (params) {
  return axios().post(
    baseUrl + '/authRule/edit',
    params
  )
}

// 删除
export function delAuthRule (ids) {
  return axios().post(
    baseUrl + '/authRule/destroy',
    {
      ids
    })
}
