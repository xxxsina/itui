import Cookies from 'vue-cookie'
import G from './g'

const iTokenKey = 'i-token'

export function getToken () {
  return Cookies.get(iTokenKey)
}

export function setToken (token, expire) {
  // 单位 秒
  let _time = {}
  if (expire) {
    _time = {expires: expire + 's'}
  } else {
    _time = {expires: G.cookie_time}
  }
  return Cookies.set(iTokenKey, token, _time)
}

export function removeToken () {
  return Cookies.delete(iTokenKey)
}
