let baseUrl = '' // 本地代理

switch (process.env.NODE_ENV) {
  case 'development':
    baseUrl = 'http://127.0.0.1:7071' // 测试环境url
    break
  case 'pre':
    baseUrl = 'http://www.amcapi.sw' // 预上线环境url
    break
  case 'production':
    baseUrl = 'http://www.amcapi.cc' // 生产环境url
    break
}

export default baseUrl
