let baseUrl = '/api' // 本地代理

switch (process.env.NODE_ENV) {
  case 'development':
    // baseUrl = 'http://www.itui360.cn' + baseUrl // 测试环境url
    break
  case 'pre':
    // baseUrl = 'http://www.amcapi.sw' // 预上线环境url
    break
  case 'production':
    // baseUrl = 'http://www.itui360.cn' // 生产环境url
    break
}

export default baseUrl
