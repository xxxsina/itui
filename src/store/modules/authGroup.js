import { getAuthGroupList, editAuthGroup, delAuthGroup } from '@/api/backend/authGroup'

const authGroup = {
  state: {
  },
  mutations: {
  },
  actions: {
    // 列表
    getAuthGroupList ({ commit }, params) {
      return new Promise((resolve, reject) => {
        getAuthGroupList(params.page).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 编辑
    editAuthGroup ({ commit }, params) {
      return new Promise((resolve, reject) => {
        editAuthGroup(params).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 删除
    delAuthGroup ({ commit }, params) {
      return new Promise((resolve, reject) => {
        delAuthGroup(params.ids).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default authGroup
