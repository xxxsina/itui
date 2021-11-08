import Cookies from 'vue-cookie'

const XTokenKey = 'X-Token'

export function getToken () {
  return Cookies.get(XTokenKey)
}

export function setToken (token) {
  return Cookies.set(XTokenKey, token)
}

export function removeToken () {
  return Cookies.delete(XTokenKey)
}
