import { getShortUrlList, editShortUrl, delShortUrl } from '@/api/backend/shorturl'

const shorturl = {
  state: {
  },
  mutations: {
  },
  actions: {
    // 列表
    getShortUrlList ({ commit }, params) {
      return new Promise((resolve, reject) => {
        getShortUrlList(params.search, params.page).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 编辑
    editShortUrl ({ commit }, params) {
      return new Promise((resolve, reject) => {
        editShortUrl(params).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 删除
    delShortUrl ({ commit }, params) {
      return new Promise((resolve, reject) => {
        delShortUrl(params.ids).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default shorturl
