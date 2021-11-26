import axios from '@/api/axios'
import baseUrl from '@/api/baseUrl'

// 列表
export function getAttachmentList (search, page) {
  return axios().post(
    baseUrl + '/attachment',
    {
      search,
      page
    }
  )
}

// 销毁
export function delAttachment (ids) {
  return axios().post(
    baseUrl + '/attachment/destroy',
    {
      ids
    })
}
