import { getAuthVipList, editAuthVip, delAuthVip } from '@/api/backend/authVip'

const authVip = {
  state: {
  },
  mutations: {
  },
  actions: {
    // 列表
    getAuthVipList ({ commit }) {
      return new Promise((resolve, reject) => {
        getAuthVipList().then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 编辑
    editAuthVip ({ commit }, params) {
      return new Promise((resolve, reject) => {
        editAuthVip(params).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 删除
    delAuthVip ({ commit }, params) {
      return new Promise((resolve, reject) => {
        delAuthVip(params.ids).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default authVip
