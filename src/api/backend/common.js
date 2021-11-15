import axios from '@/api/axios'
import baseUrl from '@/api/baseUrl'

// 获取权限组
export function getAuthGroup () {
  return axios().post(
    baseUrl + '/getAuthGroup'
  )
}
