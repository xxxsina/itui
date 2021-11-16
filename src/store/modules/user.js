import { getUserLogList } from '@/api/backend/user'

const hosts = {
  state: {
  },
  mutations: {
  },
  actions: {
    // 用户日志列表
    getUserLogList ({ commit }, params) {
      return new Promise((resolve, reject) => {
        getUserLogList(params.search, params.page).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default hosts
