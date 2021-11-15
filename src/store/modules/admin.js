import { getToken, setToken, removeToken } from '@/utils/auth'
import { loginByUsername, logout } from '@/api/backend/login'
import { getAdminList, delAdmin, editAdmin } from '@/api/backend/admin'

const admin = {
  state: {
    token: getToken(),
    admin: {}
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_ADMIN: (state, admin) => {
      state.admin = admin
    }
  },
  actions: {
    // 登录
    loginByUsername ({ commit }, params) {
      const username = params.username.trim()
      return new Promise((resolve, reject) => {
        loginByUsername(username, params.password, params.captcha).then(response => {
          commit('SET_TOKEN', response.data.token)
          commit('SET_ADMIN', response.data)
          setToken(response.data.token, response.data.expire)
          resolve(response)
        }).catch(error => {
          // console.log(error)
          reject(error)
        })
      })
    },
    // 登出
    logout ({ commit }) {
      return new Promise((resolve, reject) => {
        logout().then(response => {
          commit('SET_TOKEN', '')
          commit('SET_ADMIN', '')
          removeToken()
          resolve(response)
        }).catch(error => {
          if (error.code === 201) {
            commit('SET_TOKEN', '')
            commit('SET_ADMIN', '')
            removeToken()
          }
          reject(error)
        })
      })
    },
    // 管理员列表
    getAdminList ({ commit }, params) {
      return new Promise((resolve, reject) => {
        getAdminList(params.search, params.page).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 编辑管理员
    editAdmin ({ commit }, params) {
      return new Promise((resolve, reject) => {
        editAdmin(params).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 删除管理员
    delAdmin ({ commit }, params) {
      return new Promise((resolve, reject) => {
        delAdmin(params.ids).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default admin
