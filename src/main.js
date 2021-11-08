/* eslint-disable standard/object-curly-even-spacing */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import G from './assets/js/g'
import store from './store/index' // 引入vuex-store
import axios from 'axios'
import cookie from 'vue-cookie'
import api from './api/install'
import Fragment from 'vue-fragment'

// 导入element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.prototype.$axios = axios
Vue.prototype.$cookie = cookie
Vue.prototype.G = G
Vue.use(ElementUI, {size: 'small'})
Vue.config.productionTip = false
// 载入接口
Vue.use(api)
Vue.prototype.$menu = {}
Vue.use(Fragment.Plugin)

// 批量载入tool文件夹vue|js文件
const requireComponent = require.context('@/components/', false, /[A-Za-z]\w+\.(vue|js)$/)
requireComponent.keys().forEach(fileName => {
  var names = fileName.split('/').pop().replace(/\.\w+$/, '')
  const componentConfig = requireComponent(fileName)
  Vue.component(names, componentConfig.default || componentConfig)
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
