import axios from '@/api/axios'
import baseUrl from '@/api/baseUrl'

// 短连接列表
export function getShortUrlList (search, page) {
  return axios().post(
    baseUrl + '/shortUrl',
    {
      search,
      page
    }
  )
}

// 短连接编辑
export function editShortUrl (params) {
  return axios().post(
    baseUrl + '/shortUrl/edit',
    params
  )
}

// 短连接删除
export function delShortUrl (ids) {
  return axios().post(
    baseUrl + '/shortUrl/del',
    {
      ids
    })
}
