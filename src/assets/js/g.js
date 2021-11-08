
export default {
  imgErrPath: '../static/images/broken_err.png',
  hostName: '爱推360',
  menu: '',
  fold: false,
  drawerSizeDefault: '40%', // 默认抽屉是40%覆盖
  drawerSizeMobile: '100%', // 手机访问100%覆盖
  formWidthDefault: '14%', // 默认抽屉是14%覆盖
  formWidthMobile: 'unset', // 手机访问unset
  setMenu (data) {
    this.menu = data
  },
  // 判断是否手机访问
  isMobileInterView () {
    return navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
  },
  // menu是否折叠
  isFoldMenu () {
    return this.isMobileInterView() ? !this.fold : this.fold
  },
  // 抽屉的大小
  getDrawerSize () {
    return this.isMobileInterView() ? this.drawerSizeMobile : this.drawerSizeDefault
  },
  // 表单宽度设置
  getFormWidthSize () {
    return this.isMobileInterView() ? this.formWidthMobile : this.formWidthDefault
  },
  // 弹窗是否铺满全屏
  getFormFullWindow () {
    return this.isMobileInterView()
  }
}
