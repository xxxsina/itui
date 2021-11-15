import { getHostsList, editHosts, delHosts } from '@/api/backend/hosts'

const hosts = {
  state: {
  },
  mutations: {
  },
  actions: {
    // 列表
    getHostsList ({ commit }) {
      return new Promise((resolve, reject) => {
        getHostsList().then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 编辑
    editHosts ({ commit }, params) {
      return new Promise((resolve, reject) => {
        editHosts(params).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 删除
    delHosts ({ commit }, params) {
      return new Promise((resolve, reject) => {
        delHosts(params.ids).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default hosts
