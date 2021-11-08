import api from '../index'
import urls from './urls'

const header = {}

export default {
  text (params) {
    // return出去了一个promise
    return api.get(urls.test, params, header)
  },
  login (data, params) {
    return api.post(urls.login, params, header, data)
  }
}
