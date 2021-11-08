let baseUrl = '/api' // 本地代理

switch (process.env.NODE_ENV) {
  case 'development':
    baseUrl = 'http://www.amcapi.sw' // 测试环境url
    break
  case 'pre':
    baseUrl = 'http://www.amcapi.sw' // 预上线环境url
    break
  case 'production':
    baseUrl = 'http://www.amcapi.cc' // 生产环境url
    break
}

export default baseUrl
