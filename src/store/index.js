import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import camelCase from 'lodash/camelCase'

Vue.use(Vuex)

const modulesFiles = require.context('./modules', false, /\.js$/)
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  // set './app.js' => 'app'  $1是正则里边的捕获，(.*)内的内容；
  const moduleName = camelCase(
    modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  )
  const value = modulesFiles(modulePath)
  modules[moduleName] = value.default
  return modules
}, {})

export default new Vuex.Store({
  // state是自定义的一些变量，变量都放在这里，相当于vue里面的data
  state: {
    pathName: '000999000'
  },
  // mutations是用来触发事件，相当于vue里面的方法 methods，用户需要通过触发这个方法，借此来保存数据
  // 参数的话，第二个参数就是用户传入的值，然后在方法中赋值给state中的变量
  mutations: {
    // 例子：保存当前菜单栏的路径
    savePath (state, pathName) {
      state.pathName = pathName
    }
  },
  modules,
  getters
})
