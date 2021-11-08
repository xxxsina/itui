import Vue from 'vue'
import Router from 'vue-router'
import VueCookie from 'vue-cookie'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      meta: {
        requireAuth: false
      },
      component: () => import('@/views/index/login')
    },
    {
      path: '/',
      name: 'main',
      meta: {
        requireAuth: false,
        crumb: [
          {title: '控制台'}
        ]
      },
      components: {
        default: () => import('@/views/main'),
        content: () => import('@/views/index/home')
      },
      children: [
        {
          path: '/system/hosts',
          name: 'hosts',
          meta: {
            crumb: [
              {title: '系统管理'},
              {title: '短域名配置'}
            ]
          },
          components: {
            content: () => import('@/views/system/hosts/index')
          }
        },
        {
          path: '/system/vip',
          name: 'vip',
          meta: {
            crumb: [
              {title: '系统管理'},
              {title: 'VIP配置'}
            ]
          },
          components: {
            content: () => import('@/views/system/vip/index')
          }
        },
        {
          path: '/auth/rule',
          name: 'rule',
          meta: {
            crumb: [
              {title: '权限管理'},
              {title: '菜单规则'}
            ]
          },
          components: {
            content: () => import('@/views/auth/rule/index')
          }
        },
        {
          path: '/auth/group',
          name: 'group',
          meta: {
            crumb: [
              {title: '权限管理'},
              {title: '角色组'}
            ]
          },
          components: {
            content: () => import('@/views/auth/group/index')
          }
        },
        {
          path: '/auth/admin',
          name: 'admin',
          meta: {
            crumb: [
              {title: '权限管理'},
              {title: '管理员'}
            ]
          },
          components: {
            content: () => import('@/views/auth/admin/index')
          }
        },
        {
          path: '/member/user',
          name: 'user',
          meta: {
            crumb: [
              {title: '用户管理'},
              {title: '用户列表'}
            ]
          },
          components: {
            content: () => import('@/views/member/user/index')
          }
        },
        {
          path: '/member/userlog',
          name: 'userlog',
          meta: {
            crumb: [
              {title: '用户管理'},
              {title: '用户日志'}
            ]
          },
          components: {
            content: () => import('@/views/member/userlog/index')
          }
        },
        {
          path: '/codes/jump',
          name: 'jump',
          meta: {
            crumb: [
              {title: '活码管理'},
              {title: '连接活码'}
            ]
          },
          components: {
            content: () => import('@/views/codes/jump/index')
          }
        },
        {
          path: '/codes/jump/:parent_id',
          name: 'jump/channel',
          meta: {
            crumb: [
              {title: '活码管理'},
              {title: '连接活码'},
              {title: '渠道连接'}
            ],
            parent: '/codes/jump'
          },
          components: {
            content: () => import('@/views/codes/jump/channel/index')
          }
        },
        {
          path: '/codes/qrcode',
          name: 'qrcode',
          meta: {
            crumb: [
              {title: '活码管理'},
              {title: '二维码活码'}
            ]
          },
          components: {
            content: () => import('@/views/codes/qrcode/index')
          }
        },
        {
          path: '/codes/qrcode/:parent_id',
          name: 'qrcode/channel',
          meta: {
            crumb: [
              {title: '活码管理'},
              {title: '二维码活码'},
              {title: '渠道二维码'}
            ],
            parent: '/codes/qrcode'
          },
          components: {
            content: () => import('@/views/codes/qrcode/channel/index')
          }
        },
        {
          path: '/codes/invite',
          name: 'invite',
          meta: {
            crumb: [
              {title: '活码管理'},
              {title: '口令活码'}
            ]
          },
          components: {
            content: () => import('@/views/codes/invite/index')
          }
        },
        {
          path: '/codes/invite/:parent_id',
          name: 'invite/channel',
          meta: {
            crumb: [
              {title: '活码管理'},
              {title: '口令活码'},
              {title: '渠道口令'}
            ],
            parent: '/codes/invite'
          },
          components: {
            content: () => import('@/views/codes/invite/channel/index')
          }
        },
        {
          path: '/sheet',
          name: 'sheet',
          meta: {
            crumb: [
              {title: '表单管理'}
            ]
          },
          components: {
            content: () => import('@/views/sheet/index')
          }
        },
        {
          path: '/sheet/:parent_id',
          name: 'sheet/list',
          meta: {
            crumb: [
              {title: '表单'},
              {title: '数据列表'}
            ],
            parent: '/sheet'
          },
          components: {
            content: () => import('@/views/sheet/form/index')
          }
        },
        {
          path: '/shorturl',
          name: 'shorturl',
          meta: {
            requireAuth: false,
            crumb: [
              {title: '短连接'}
            ]
          },
          components: {
            content: () => import('@/views/shorturl/index')
          }
        }
      ]
    }
  ]
})

// 路由跳转之前判断
router.beforeEach((to, from, next) => {
  console.log(to)
  if (to.meta.requireAuth) {
    const token = VueCookie.get('token')
    if (typeof token !== 'string' || !token) {
      return next({
        path: '/login',
        // 将跳转的路由path作为参数，登录成功后跳转到该路由
        query: {redirect: to.fullPath}
      })
    }
  }
  return next()
})

export default router
