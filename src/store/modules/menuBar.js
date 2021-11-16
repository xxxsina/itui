// eslint-disable-next-line no-unused-vars
const menuBar = {
  state: {
    data: [
      {
        id: 1,
        ismenu: 1,
        pid: 0,
        rulelink: '/',
        title: '控制台',
        icon: 'el-icon-menu',
        weight: 100,
        status: 2
      },
      {
        id: 2,
        ismenu: 1,
        pid: 0,
        rulelink: '/system',
        title: '系统管理',
        icon: 'el-icon-s-platform',
        weight: 100,
        status: 1,
        // 二级
        childs: [
          {
            id: 3,
            ismenu: 1,
            pid: 2,
            title: '系统配置',
            icon: '',
            weight: 100,
            rulelink: '/system/setting',
            status: 1
          },
          {
            id: 4,
            ismenu: 1,
            pid: 2,
            title: '短域名配置',
            icon: '',
            weight: 100,
            rulelink: '/system/hosts',
            status: 1
          },
          {
            id: 13,
            ismenu: 1,
            pid: 2,
            title: 'VIP配置',
            icon: '',
            weight: 100,
            rulelink: '/system/vip',
            status: 1
          }
        ]
      },
      {
        id: 5,
        ismenu: 1,
        pid: 0,
        rulelink: '/auth',
        title: '权限管理',
        icon: 'el-icon-s-management',
        weight: 100,
        status: 1,
        // 二级
        childs: [
          {
            id: 6,
            ismenu: 1,
            pid: 5,
            title: '菜单规则',
            icon: '',
            weight: 100,
            rulelink: '/auth/rule',
            status: 1
          },
          {
            id: 7,
            ismenu: 1,
            pid: 5,
            title: '角色组',
            icon: '',
            weight: 100,
            rulelink: '/auth/group',
            status: 1,
            childs: []
          },
          {
            id: 8,
            ismenu: 1,
            pid: 5,
            title: '管理员',
            icon: '',
            weight: 100,
            rulelink: '/auth/admin',
            status: 1,
            childs: [
              {
                id: 9,
                ismenu: 2,
                pid: 8,
                title: '编辑',
                icon: '',
                weight: 100,
                rulelink: '/admin/edit',
                status: 1
              },
              {
                id: 10,
                ismenu: 2,
                pid: 8,
                title: '删除',
                icon: '',
                weight: 100,
                rulelink: '/admin/del',
                status: 1
              }
            ]
          },
          {
            id: 21,
            ismenu: 1,
            pid: 5,
            title: '管理员日志',
            icon: '',
            weight: 100,
            rulelink: '/auth/adminlog',
            status: 1,
            childs: []
          }
        ]
      },
      {
        id: 11,
        ismenu: 1,
        pid: 0,
        rulelink: '/member',
        title: '用户管理',
        icon: 'el-icon-user',
        weight: 100,
        status: 1,
        // 二级
        childs: [
          {
            id: 12,
            ismenu: 1,
            pid: 11,
            title: '用户',
            icon: '',
            weight: 100,
            rulelink: '/member/user',
            status: 1
          },
          {
            id: 20,
            ismenu: 1,
            pid: 11,
            title: '用户日志',
            icon: '',
            weight: 100,
            rulelink: '/member/userlog',
            status: 1
          }
        ]
      },
      {
        id: 14,
        ismenu: 1,
        pid: 0,
        rulelink: '/codes',
        title: '活码管理',
        icon: 'el-icon-link',
        weight: 100,
        status: 1,
        // 二级
        childs: [
          {
            id: 15,
            ismenu: 1,
            pid: 14,
            title: '连接活码',
            icon: '',
            weight: 100,
            rulelink: '/codes/jump',
            status: 1
          },
          {
            id: 16,
            ismenu: 1,
            pid: 14,
            title: '二维码活码',
            icon: '',
            weight: 100,
            rulelink: '/codes/qrcode',
            status: 1
          },
          {
            id: 17,
            ismenu: 1,
            pid: 14,
            title: '口令活码',
            icon: '',
            weight: 100,
            rulelink: '/codes/invite',
            status: 1
          }
        ]
      },
      {
        id: 18,
        ismenu: 1,
        pid: 0,
        rulelink: '/sheet',
        title: '表单管理',
        icon: 'el-icon-s-order',
        weight: 100,
        status: 1
      },
      {
        id: 19,
        ismenu: 1,
        pid: 0,
        rulelink: '/shorturl',
        title: '短连接管理',
        icon: 'el-icon-share',
        weight: 100,
        status: 1,
        childs: []
      }
    ]
  },
  mutations: {
    setData (state, data) {
      state.data = data
    }
  },
  actions: {
    actSetData ({commit}, data) {
      commit('setData', data)
    }
  }
}

export default menuBar
