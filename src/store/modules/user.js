import { getUserLogList, getUserList, editUser, delUser, setVip } from '@/api/backend/user'

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
    },
    // 列表
    getUserList ({ commit }, params) {
      return new Promise((resolve, reject) => {
        getUserList(params.search, params.page).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 编辑
    editUser ({ commit }, params) {
      return new Promise((resolve, reject) => {
        editUser(params).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 删除
    delUser ({ commit }, params) {
      return new Promise((resolve, reject) => {
        delUser(params.ids).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 设置vip
    setVip ({ commit }, params) {
      return new Promise((resolve, reject) => {
        setVip(params).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default hosts
