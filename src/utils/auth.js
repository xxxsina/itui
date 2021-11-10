import Cookies from 'vue-cookie'

const iTokenKey = 'i-token'

export function getToken () {
  return Cookies.get(iTokenKey)
}

export function setToken (token) {
  return Cookies.set(iTokenKey, token)
}

export function removeToken () {
  return Cookies.delete(iTokenKey)
}
