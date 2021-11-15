import { getAuthRuleList, editAuthRule, delAuthRule } from '@/api/backend/authRule'

const authRule = {
  state: {
  },
  mutations: {
  },
  actions: {
    // 列表
    getAuthRuleList ({ commit }) {
      return new Promise((resolve, reject) => {
        getAuthRuleList().then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 编辑
    editAuthRule ({ commit }, params) {
      return new Promise((resolve, reject) => {
        editAuthRule(params).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 删除
    delAuthRule ({ commit }, params) {
      return new Promise((resolve, reject) => {
        delAuthRule(params.ids).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default authRule
