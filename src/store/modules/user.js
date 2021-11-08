import { getToken, setToken, removeToken } from '@/utils/auth'
import { loginByUsername, logout } from '@/api/admin/login'

const user = {
  state: {
    token: getToken(),
    user: '',
    status: '',
    username: '',
    avatar: '',
    roles: []
  },
  mutations: {
    SET_TOKEN: (state, token) => {

    },
    SET_USER: (state, user) => {

    },
    SET_STATUS: (state, status) => {

    },
    SET_USERNAME: (state, username) => {

    },
    SET_AVATAR: (state, avatar) => {

    },
    SET_ROLES: (state, roles) => {

    }
  },
  actions: {
    // 登录
    LoginByUsername ({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        loginByUsername(username, userInfo.password).then(response => {
          const data = response.data
          commit('SET_TOKEN', data.token)
          setToken(data.token)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 前端 登出
    Logout ({ commit }) {
      return new Promise((resolve, reject) => {
        logout().then(response => {
          commit('SET_TOKEN', '')
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default user
