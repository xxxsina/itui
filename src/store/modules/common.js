import { getAuthGroup, getPeriodConfig, getShortHostsConfig, getVipConfig } from '@/api/backend/common'

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
    },
    // 获取有效期
    getPeriodConfig ({ commit }) {
      return new Promise((resolve, reject) => {
        getPeriodConfig().then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 获取短连接
    getShortHostsConfig ({ commit }) {
      return new Promise((resolve, reject) => {
        getShortHostsConfig().then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 获取vip
    getVipConfig ({ commit }) {
      return new Promise((resolve, reject) => {
        getVipConfig().then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default common
