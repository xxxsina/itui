import axios from '@/api/axios'
import baseUrl from '@/api/baseUrl'

// 获取menus
export function getMenus () {
  return axios().post(
    baseUrl + '/getMenus'
  )
}
