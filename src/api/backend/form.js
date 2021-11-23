import axios from '@/api/axios'
import baseUrl from '@/api/baseUrl'

// 表单列表
export function getFormList (search, page) {
  return axios().post(
    baseUrl + '/form',
    {
      search,
      page
    }
  )
}

// 表单编辑
export function editForm (params) {
  return axios().post(
    baseUrl + '/form/edit',
    params
  )
}

// 表单删除
export function delForm (ids) {
  return axios().post(
    baseUrl + '/form/del',
    {
      ids
    })
}

// 表单数据列表
export function getFormLogList (search, page) {
  return axios().post(
    baseUrl + '/formLog',
    {
      search,
      page
    }
  )
}

// 表单数据编辑
export function editFormLog (params) {
  return axios().post(
    baseUrl + '/formLog/edit',
    params
  )
}

// 表单数据删除
export function delFormLog (ids) {
  return axios().post(
    baseUrl + '/formLog/del',
    {
      ids
    })
}
