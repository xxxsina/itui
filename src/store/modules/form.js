import { getFormList, editForm, delForm, getFormLogList, editFormLog, delFormLog, downloadJumpUrl } from '@/api/backend/form'

const hosts = {
  state: {
  },
  mutations: {
  },
  actions: {
    // 列表
    getFormList ({ commit }, params) {
      return new Promise((resolve, reject) => {
        getFormList(params.search, params.page).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 编辑
    editForm ({ commit }, params) {
      return new Promise((resolve, reject) => {
        editForm(params).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 删除
    delForm ({ commit }, params) {
      return new Promise((resolve, reject) => {
        delForm(params.ids).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 提交表单数据列表
    getFormLogList ({ commit }, params) {
      return new Promise((resolve, reject) => {
        getFormLogList(params.search, params.page).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 编辑
    editFormLog ({ commit }, params) {
      return new Promise((resolve, reject) => {
        editFormLog(params).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 提交表单数据删除
    delFormLog ({ commit }, params) {
      return new Promise((resolve, reject) => {
        delFormLog(params.ids).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 下载
    downloadJumpUrl ({ commit }, params) {
      return new Promise((resolve, reject) => {
        downloadJumpUrl(params).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default hosts
