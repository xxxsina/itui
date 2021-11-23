import { getJumpList, editJump, delJump, getJumpUrlList, editJumpUrl, delJumpUrl } from '@/api/backend/jump'

const jump = {
  state: {
  },
  mutations: {
  },
  actions: {
    // 列表
    getJumpList ({ commit }, params) {
      return new Promise((resolve, reject) => {
        getJumpList(params.search, params.page).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 编辑
    editJump ({ commit }, params) {
      return new Promise((resolve, reject) => {
        editJump(params).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 删除
    delJump ({ commit }, params) {
      return new Promise((resolve, reject) => {
        delJump(params.ids).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 渠道列表
    getJumpUrlList ({ commit }, params) {
      return new Promise((resolve, reject) => {
        getJumpUrlList(params.search, params.page).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 渠道编辑
    editJumpUrl ({ commit }, params) {
      return new Promise((resolve, reject) => {
        editJumpUrl(params).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 渠道删除
    delJumpUrl ({ commit }, params) {
      return new Promise((resolve, reject) => {
        delJumpUrl(params.ids).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default jump
