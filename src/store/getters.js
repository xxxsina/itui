const getters = {
  token: state => state.admin.token,
  adminInfo: state => {
    // 注意：外部获取的时候要 setTimeout 要不然获取不到值，因为请求是异步的
    return state.admin.data
  },
  menuBar: state => state.menuBar.menus
}

export default getters
