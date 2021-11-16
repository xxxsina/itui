import axios from '@/api/axios'
import baseUrl from '@/api/baseUrl'

// 用户日志列表
export function getUserLogList (search, page) {
  return axios().post(
    baseUrl + '/userLog',
    {
      search,
      page
    }
  )
}
