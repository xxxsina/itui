import { getAuthGroup } from '@/api/backend/common'

const common = {
  state: {
    authGroup: {}
  },
  mutations: {
  },
  actions: {
    // 获取权限组
    getAuthGroup ({ commit }) {
      return new Promise((resolve, reject) => {
        getAuthGroup().then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default common
