import axios from '@/api/axios'
import baseUrl from '@/api/baseUrl'

// 列表
export function getJumpList (search, page) {
  return axios().post(
    baseUrl + '/jump',
    {
      search,
      page
    }
  )
}

// 编辑
export function editJump (params) {
  return axios().post(
    baseUrl + '/jump/edit',
    params
  )
}

// 删除
export function delJump (ids) {
  return axios().post(
    baseUrl + '/jump/del',
    {
      ids
    })
}

// 渠道列表
export function getJumpUrlList (search, page) {
  return axios().post(
    baseUrl + '/jumpUrl',
    {
      search,
      page
    }
  )
}

// 渠道编辑
export function editJumpUrl (params) {
  return axios().post(
    baseUrl + '/jumpUrl/edit',
    params
  )
}

// 渠道删除
export function delJumpUrl (ids) {
  return axios().post(
    baseUrl + '/jumpUrl/del',
    {
      ids
    })
}