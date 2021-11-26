import { getAttachmentList, delAttachment } from '@/api/backend/attach'

const authVip = {
  state: {
  },
  mutations: {
  },
  actions: {
    // 列表
    getAttachmentList ({ commit }, params) {
      return new Promise((resolve, reject) => {
        getAttachmentList(params.search, params.page).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 销毁
    delAttachment ({ commit }, params) {
      return new Promise((resolve, reject) => {
        delAttachment(params.ids).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default authVip
