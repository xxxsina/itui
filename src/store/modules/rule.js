// eslint-disable-next-line no-unused-vars
const rule = {
  state: {
    isMenu: {
      id: 0,
      ismenu: 0
    }
  },
  mutations: {
    setIsMenu (state, data) {
      state.isMenu = data
    }
  },
  actions: {
    setIsMenu ({commit}, data) {
      // console.log(data)
      // console.log('id =>', data.id)
      // console.log('ismenu =>', data.ismenu)
      //   let _data = {
      //     'username': '20190901006',
      //     'password': '423423',
      //     'page': this.page
      //   }
      //   let params = {
      //     type: 'npcxxxx'
      //   }
      //   console.log(Vue.$axios)
      //   this.$api.matches.login(_data, params)
      commit('setIsMenu', data)
    }
  }
}

export default rule
