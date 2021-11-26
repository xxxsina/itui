import { getMenus } from '@/api/backend/menuBar'

const menuBar = {
  state: {
    data: [
      {
        'id': 1,
        'type': 'file',
        'pid': 0,
        'status': 1,
        'rule': '--',
        'name': '公用配置',
        'icon': '',
        'ismenu': 1,
        'weight': 0,
        'updatetime': '2021-11-24 17:53:34',
        'createtime': '2021-11-24 16:25:58',
        'childs': [
          {
            'id': 60,
            'type': 'file',
            'pid': 1,
            'status': 1,
            'rule': '/common/getauthgroup',
            'name': '获取权限组',
            'icon': '',
            'ismenu': 0,
            'weight': 0,
            'updatetime': '2021-11-24 17:55:16',
            'createtime': '2021-11-24 17:55:16',
            'childs': []
          },
          {
            'id': 61,
            'type': 'file',
            'pid': 1,
            'status': 1,
            'rule': '/common/getshorthostsconfig',
            'name': '获取短域名',
            'icon': '',
            'ismenu': 0,
            'weight': 0,
            'updatetime': '2021-11-24 17:56:04',
            'createtime': '2021-11-24 17:56:04',
            'childs': []
          },
          {
            'id': 62,
            'type': 'file',
            'pid': 1,
            'status': 1,
            'rule': '/common/getperiodconfig',
            'name': '获取有效期',
            'icon': '',
            'ismenu': 0,
            'weight': 0,
            'updatetime': '2021-11-24 17:56:35',
            'createtime': '2021-11-24 17:56:35',
            'childs': []
          },
          {
            'id': 63,
            'type': 'file',
            'pid': 1,
            'status': 1,
            'rule': '/common/getvipconfig',
            'name': '获取vip配置',
            'icon': '',
            'ismenu': 0,
            'weight': 0,
            'updatetime': '2021-11-24 17:56:55',
            'createtime': '2021-11-24 17:56:55',
            'childs': []
          }
        ]
      },
      {
        'id': 2,
        'type': 'file',
        'pid': 0,
        'status': 1,
        'rule': '/',
        'name': '控制台',
        'icon': 'el-icon-menu',
        'ismenu': 1,
        'weight': 1,
        'updatetime': '2021-11-24 16:26:14',
        'createtime': '2021-11-24 16:26:14',
        'childs': []
      },
      {
        'id': 3,
        'type': 'file',
        'pid': 0,
        'status': 1,
        'rule': '/system',
        'name': '系统管理',
        'icon': 'el-icon-s-platform',
        'ismenu': 1,
        'weight': 2,
        'updatetime': '2021-11-24 16:26:57',
        'createtime': '2021-11-24 16:26:57',
        'childs': [
          {
            'id': 4,
            'type': 'file',
            'pid': 3,
            'status': 1,
            'rule': '/system/profile',
            'name': '个人资料',
            'icon': '',
            'ismenu': 1,
            'weight': 201,
            'updatetime': '2021-11-24 16:31:05',
            'createtime': '2021-11-24 16:28:22',
            'childs': [
              {
                'id': 28,
                'type': 'file',
                'pid': 4,
                'status': 1,
                'rule': '/common/setadminprofile',
                'name': '编辑',
                'icon': '',
                'ismenu': 0,
                'weight': 0,
                'updatetime': '2021-11-24 17:22:16',
                'createtime': '2021-11-24 17:22:16',
                'childs': []
              },
              {
                'id': 27,
                'type': 'file',
                'pid': 4,
                'status': 1,
                'rule': '/common/getadminprofile',
                'name': '查看',
                'icon': '',
                'ismenu': 0,
                'weight': 0,
                'updatetime': '2021-11-24 17:21:23',
                'createtime': '2021-11-24 17:21:23',
                'childs': []
              }
            ]
          },
          {
            'id': 5,
            'type': 'file',
            'pid': 3,
            'status': 1,
            'rule': '/system/hosts',
            'name': '短域名配置',
            'icon': '',
            'ismenu': 1,
            'weight': 202,
            'updatetime': '2021-11-24 16:31:12',
            'createtime': '2021-11-24 16:29:02',
            'childs': [
              {
                'id': 25,
                'type': 'file',
                'pid': 5,
                'status': 1,
                'rule': '/hosts/index',
                'name': '查看',
                'icon': '',
                'ismenu': 0,
                'weight': 0,
                'updatetime': '2021-11-24 17:18:25',
                'createtime': '2021-11-24 17:18:25',
                'childs': []
              },
              {
                'id': 22,
                'type': 'file',
                'pid': 5,
                'status': 1,
                'rule': '/hosts/destroy',
                'name': '销毁',
                'icon': '',
                'ismenu': 0,
                'weight': 0,
                'updatetime': '2021-11-24 16:54:15',
                'createtime': '2021-11-24 16:52:44',
                'childs': []
              },
              {
                'id': 21,
                'type': 'file',
                'pid': 5,
                'status': 1,
                'rule': '/hosts/edit',
                'name': '编辑',
                'icon': '',
                'ismenu': 0,
                'weight': 0,
                'updatetime': '2021-11-24 16:50:32',
                'createtime': '2021-11-24 16:50:28',
                'childs': []
              }
            ]
          },
          {
            'id': 6,
            'type': 'file',
            'pid': 3,
            'status': 1,
            'rule': '/system/vip',
            'name': 'VIP配置',
            'icon': '',
            'ismenu': 1,
            'weight': 203,
            'updatetime': '2021-11-24 16:31:17',
            'createtime': '2021-11-24 16:29:36',
            'childs': [
              {
                'id': 26,
                'type': 'file',
                'pid': 6,
                'status': 1,
                'rule': '/authvip/index',
                'name': '查看',
                'icon': '',
                'ismenu': 0,
                'weight': 0,
                'updatetime': '2021-11-24 17:57:40',
                'createtime': '2021-11-24 17:19:17',
                'childs': []
              },
              {
                'id': 24,
                'type': 'file',
                'pid': 6,
                'status': 1,
                'rule': '/authvip/del',
                'name': '删除',
                'icon': '',
                'ismenu': 0,
                'weight': 0,
                'updatetime': '2021-11-24 17:57:59',
                'createtime': '2021-11-24 16:58:11',
                'childs': []
              },
              {
                'id': 23,
                'type': 'file',
                'pid': 6,
                'status': 1,
                'rule': '/authvip/edit',
                'name': '编辑',
                'icon': '',
                'ismenu': 0,
                'weight': 0,
                'updatetime': '2021-11-24 17:58:15',
                'createtime': '2021-11-24 16:57:46',
                'childs': []
              }
            ]
          }
        ]
      },
      {
        'id': 7,
        'type': 'file',
        'pid': 0,
        'status': 1,
        'rule': '/auth',
        'name': '权限管理',
        'icon': 'el-icon-s-management',
        'ismenu': 1,
        'weight': 3,
        'updatetime': '2021-11-24 16:30:57',
        'createtime': '2021-11-24 16:30:57',
        'childs': [
          {
            'id': 8,
            'type': 'file',
            'pid': 7,
            'status': 1,
            'rule': '/auth/rule',
            'name': '菜单规则',
            'icon': '',
            'ismenu': 1,
            'weight': 301,
            'updatetime': '2021-11-24 16:32:07',
            'createtime': '2021-11-24 16:32:07',
            'childs': [
              {
                'id': 31,
                'type': 'file',
                'pid': 8,
                'status': 1,
                'rule': '/authrule/destroy',
                'name': '销毁',
                'icon': '',
                'ismenu': 0,
                'weight': 0,
                'updatetime': '2021-11-24 17:58:32',
                'createtime': '2021-11-24 17:26:06',
                'childs': []
              },
              {
                'id': 30,
                'type': 'file',
                'pid': 8,
                'status': 1,
                'rule': '/authrule/edit',
                'name': '编辑',
                'icon': '',
                'ismenu': 0,
                'weight': 0,
                'updatetime': '2021-11-24 17:25:08',
                'createtime': '2021-11-24 17:25:08',
                'childs': []
              },
              {
                'id': 29,
                'type': 'file',
                'pid': 8,
                'status': 1,
                'rule': '/authrule/index',
                'name': '查看',
                'icon': '',
                'ismenu': 0,
                'weight': 0,
                'updatetime': '2021-11-24 17:24:08',
                'createtime': '2021-11-24 17:24:08',
                'childs': []
              }
            ]
          },
          {
            'id': 9,
            'type': 'file',
            'pid': 7,
            'status': 1,
            'rule': '/auth/group',
            'name': '角色组',
            'icon': '',
            'ismenu': 1,
            'weight': 302,
            'updatetime': '2021-11-24 16:32:49',
            'createtime': '2021-11-24 16:32:49',
            'childs': [
              {
                'id': 33,
                'type': 'file',
                'pid': 9,
                'status': 1,
                'rule': '/authgroup/edit',
                'name': '编辑',
                'icon': '',
                'ismenu': 0,
                'weight': 0,
                'updatetime': '2021-11-24 17:29:43',
                'createtime': '2021-11-24 17:29:43',
                'childs': []
              },
              {
                'id': 34,
                'type': 'file',
                'pid': 9,
                'status': 1,
                'rule': '/authgroup/destroy',
                'name': '销毁',
                'icon': '',
                'ismenu': 0,
                'weight': 0,
                'updatetime': '2021-11-24 17:30:08',
                'createtime': '2021-11-24 17:30:08',
                'childs': []
              },
              {
                'id': 32,
                'type': 'file',
                'pid': 9,
                'status': 1,
                'rule': '/authgroup',
                'name': '查看',
                'icon': '',
                'ismenu': 0,
                'weight': 0,
                'updatetime': '2021-11-24 17:29:21',
                'createtime': '2021-11-24 17:29:21',
                'childs': []
              }
            ]
          },
          {
            'id': 10,
            'type': 'file',
            'pid': 7,
            'status': 1,
            'rule': '/auth/admin',
            'name': '管理员',
            'icon': '',
            'ismenu': 1,
            'weight': 303,
            'updatetime': '2021-11-24 16:33:29',
            'createtime': '2021-11-24 16:33:29',
            'childs': [
              {
                'id': 35,
                'type': 'file',
                'pid': 10,
                'status': 1,
                'rule': '/admin',
                'name': '查看',
                'icon': '',
                'ismenu': 0,
                'weight': 0,
                'updatetime': '2021-11-24 17:31:05',
                'createtime': '2021-11-24 17:31:05',
                'childs': []
              },
              {
                'id': 36,
                'type': 'file',
                'pid': 10,
                'status': 1,
                'rule': '/admin/edit',
                'name': '编辑',
                'icon': '',
                'ismenu': 0,
                'weight': 0,
                'updatetime': '2021-11-24 17:31:51',
                'createtime': '2021-11-24 17:31:51',
                'childs': []
              },
              {
                'id': 37,
                'type': 'file',
                'pid': 10,
                'status': 1,
                'rule': '/admin/destroy',
                'name': '销毁',
                'icon': '',
                'ismenu': 0,
                'weight': 0,
                'updatetime': '2021-11-24 17:32:09',
                'createtime': '2021-11-24 17:32:09',
                'childs': []
              }
            ]
          },
          {
            'id': 11,
            'type': 'file',
            'pid': 7,
            'status': 1,
            'rule': '/auth/adminlog',
            'name': '管理员日志',
            'icon': '',
            'ismenu': 1,
            'weight': 304,
            'updatetime': '2021-11-24 16:34:04',
            'createtime': '2021-11-24 16:34:04',
            'childs': [
              {
                'id': 38,
                'type': 'file',
                'pid': 11,
                'status': 1,
                'rule': '/adminlog',
                'name': '查看',
                'icon': '',
                'ismenu': 0,
                'weight': 0,
                'updatetime': '2021-11-24 17:32:37',
                'createtime': '2021-11-24 17:32:37',
                'childs': []
              }
            ]
          }
        ]
      },
      {
        'id': 12,
        'type': 'file',
        'pid': 0,
        'status': 1,
        'rule': '/member',
        'name': '用户管理',
        'icon': 'el-icon-user',
        'ismenu': 1,
        'weight': 4,
        'updatetime': '2021-11-24 16:35:40',
        'createtime': '2021-11-24 16:35:40',
        'childs': [
          {
            'id': 13,
            'type': 'file',
            'pid': 12,
            'status': 1,
            'rule': '/member/user',
            'name': '用户',
            'icon': '',
            'ismenu': 1,
            'weight': 401,
            'updatetime': '2021-11-24 16:36:48',
            'createtime': '2021-11-24 16:36:48',
            'childs': [
              {
                'id': 39,
                'type': 'file',
                'pid': 13,
                'status': 1,
                'rule': '/user',
                'name': '查看',
                'icon': '',
                'ismenu': 0,
                'weight': 0,
                'updatetime': '2021-11-24 17:33:42',
                'createtime': '2021-11-24 17:33:05',
                'childs': []
              },
              {
                'id': 40,
                'type': 'file',
                'pid': 13,
                'status': 1,
                'rule': '/user/edit',
                'name': '编辑',
                'icon': '',
                'ismenu': 0,
                'weight': 0,
                'updatetime': '2021-11-24 17:33:34',
                'createtime': '2021-11-24 17:33:34',
                'childs': []
              },
              {
                'id': 41,
                'type': 'file',
                'pid': 13,
                'status': 1,
                'rule': '/user/destroy',
                'name': '销毁',
                'icon': '',
                'ismenu': 0,
                'weight': 0,
                'updatetime': '2021-11-24 17:34:10',
                'createtime': '2021-11-24 17:34:10',
                'childs': []
              },
              {
                'id': 42,
                'type': 'file',
                'pid': 13,
                'status': 1,
                'rule': '/user/setvip',
                'name': '设置vip',
                'icon': '',
                'ismenu': 0,
                'weight': 0,
                'updatetime': '2021-11-24 17:34:25',
                'createtime': '2021-11-24 17:34:25',
                'childs': []
              }
            ]
          },
          {
            'id': 14,
            'type': 'file',
            'pid': 12,
            'status': 1,
            'rule': '/member/userlog',
            'name': '用户日志',
            'icon': '',
            'ismenu': 1,
            'weight': 402,
            'updatetime': '2021-11-24 16:37:38',
            'createtime': '2021-11-24 16:37:38',
            'childs': [
              {
                'id': 43,
                'type': 'file',
                'pid': 14,
                'status': 1,
                'rule': '/userlog',
                'name': '查看',
                'icon': '',
                'ismenu': 0,
                'weight': 0,
                'updatetime': '2021-11-24 17:35:04',
                'createtime': '2021-11-24 17:35:04',
                'childs': []
              }
            ]
          }
        ]
      },
      {
        'id': 15,
        'type': 'file',
        'pid': 0,
        'status': 1,
        'rule': '/codes',
        'name': '活码管理',
        'icon': 'el-icon-link',
        'ismenu': 1,
        'weight': 5,
        'updatetime': '2021-11-24 16:39:38',
        'createtime': '2021-11-24 16:39:03',
        'childs': [
          {
            'id': 16,
            'type': 'file',
            'pid': 15,
            'status': 1,
            'rule': '/codes/jump',
            'name': '连接活码',
            'icon': '',
            'ismenu': 1,
            'weight': 501,
            'updatetime': '2021-11-24 16:39:56',
            'createtime': '2021-11-24 16:39:56',
            'childs': [
              {
                'id': 48,
                'type': 'file',
                'pid': 16,
                'status': 1,
                'rule': '/jumpurl/edit',
                'name': '渠道编辑',
                'icon': '',
                'ismenu': 0,
                'weight': 0,
                'updatetime': '2021-11-24 17:38:14',
                'createtime': '2021-11-24 17:38:14',
                'childs': []
              },
              {
                'id': 44,
                'type': 'file',
                'pid': 16,
                'status': 1,
                'rule': '/jump',
                'name': '查看',
                'icon': '',
                'ismenu': 0,
                'weight': 0,
                'updatetime': '2021-11-24 17:36:02',
                'createtime': '2021-11-24 17:36:02',
                'childs': []
              },
              {
                'id': 45,
                'type': 'file',
                'pid': 16,
                'status': 1,
                'rule': '/jump/edit',
                'name': '编辑',
                'icon': '',
                'ismenu': 0,
                'weight': 0,
                'updatetime': '2021-11-24 17:36:34',
                'createtime': '2021-11-24 17:36:34',
                'childs': []
              },
              {
                'id': 46,
                'type': 'file',
                'pid': 16,
                'status': 1,
                'rule': '/jump/del',
                'name': '删除',
                'icon': '',
                'ismenu': 0,
                'weight': 0,
                'updatetime': '2021-11-24 17:36:51',
                'createtime': '2021-11-24 17:36:51',
                'childs': []
              },
              {
                'id': 47,
                'type': 'file',
                'pid': 16,
                'status': 1,
                'rule': '/jumpurl',
                'name': '渠道查看',
                'icon': '',
                'ismenu': 0,
                'weight': 0,
                'updatetime': '2021-11-24 17:37:57',
                'createtime': '2021-11-24 17:37:57',
                'childs': []
              },
              {
                'id': 49,
                'type': 'file',
                'pid': 16,
                'status': 1,
                'rule': '/jumpurl/del',
                'name': '渠道删除',
                'icon': '',
                'ismenu': 0,
                'weight': 0,
                'updatetime': '2021-11-24 17:38:32',
                'createtime': '2021-11-24 17:38:32',
                'childs': []
              }
            ]
          },
          {
            'id': 17,
            'type': 'file',
            'pid': 15,
            'status': 1,
            'rule': '/codes/qrcode',
            'name': '二维码活码',
            'icon': '',
            'ismenu': 1,
            'weight': 502,
            'updatetime': '2021-11-24 16:40:30',
            'createtime': '2021-11-24 16:40:30',
            'childs': []
          },
          {
            'id': 18,
            'type': 'file',
            'pid': 15,
            'status': 1,
            'rule': '/codes/invite',
            'name': '口令活码',
            'icon': '',
            'ismenu': 1,
            'weight': 503,
            'updatetime': '2021-11-24 16:40:55',
            'createtime': '2021-11-24 16:40:55',
            'childs': []
          }
        ]
      },
      {
        'id': 19,
        'type': 'file',
        'pid': 0,
        'status': 1,
        'rule': '/sheet',
        'name': '表单管理',
        'icon': 'el-icon-s-order',
        'ismenu': 1,
        'weight': 6,
        'updatetime': '2021-11-24 16:43:01',
        'createtime': '2021-11-24 16:43:01',
        'childs': [
          {
            'id': 50,
            'type': 'file',
            'pid': 19,
            'status': 1,
            'rule': '/form',
            'name': '查看',
            'icon': '',
            'ismenu': 0,
            'weight': 0,
            'updatetime': '2021-11-24 17:39:34',
            'createtime': '2021-11-24 17:39:34',
            'childs': []
          },
          {
            'id': 51,
            'type': 'file',
            'pid': 19,
            'status': 1,
            'rule': '/form/edit',
            'name': '编辑',
            'icon': '',
            'ismenu': 0,
            'weight': 0,
            'updatetime': '2021-11-24 17:39:53',
            'createtime': '2021-11-24 17:39:53',
            'childs': []
          },
          {
            'id': 52,
            'type': 'file',
            'pid': 19,
            'status': 1,
            'rule': '/form/del',
            'name': '删除',
            'icon': '',
            'ismenu': 0,
            'weight': 0,
            'updatetime': '2021-11-24 17:40:09',
            'createtime': '2021-11-24 17:40:09',
            'childs': []
          },
          {
            'id': 53,
            'type': 'file',
            'pid': 19,
            'status': 1,
            'rule': '/formlog',
            'name': '表单数据查看',
            'icon': '',
            'ismenu': 0,
            'weight': 0,
            'updatetime': '2021-11-24 17:40:34',
            'createtime': '2021-11-24 17:40:34',
            'childs': []
          },
          {
            'id': 54,
            'type': 'file',
            'pid': 19,
            'status': 1,
            'rule': '/formlog/edit',
            'name': '表单数据编辑',
            'icon': '',
            'ismenu': 0,
            'weight': 0,
            'updatetime': '2021-11-24 17:40:52',
            'createtime': '2021-11-24 17:40:52',
            'childs': []
          },
          {
            'id': 55,
            'type': 'file',
            'pid': 19,
            'status': 1,
            'rule': '/formlog/del',
            'name': '表单数据删除',
            'icon': '',
            'ismenu': 0,
            'weight': 0,
            'updatetime': '2021-11-24 17:41:05',
            'createtime': '2021-11-24 17:41:05',
            'childs': []
          }
        ]
      },
      {
        'id': 20,
        'type': 'file',
        'pid': 0,
        'status': 1,
        'rule': '/short',
        'name': '短连接管理',
        'icon': 'el-icon-share',
        'ismenu': 1,
        'weight': 7,
        'updatetime': '2021-11-24 17:52:27',
        'createtime': '2021-11-24 16:43:40',
        'childs': [
          {
            'id': 57,
            'type': 'file',
            'pid': 20,
            'status': 1,
            'rule': '/shorturl',
            'name': '查看',
            'icon': '',
            'ismenu': 0,
            'weight': 0,
            'updatetime': '2021-11-24 17:52:45',
            'createtime': '2021-11-24 17:52:45',
            'childs': []
          },
          {
            'id': 58,
            'type': 'file',
            'pid': 20,
            'status': 1,
            'rule': '/shorturl/edit',
            'name': '编辑',
            'icon': '',
            'ismenu': 0,
            'weight': 0,
            'updatetime': '2021-11-24 17:53:07',
            'createtime': '2021-11-24 17:53:07',
            'childs': []
          },
          {
            'id': 59,
            'type': 'file',
            'pid': 20,
            'status': 1,
            'rule': '/shorturl/del',
            'name': '删除',
            'icon': '',
            'ismenu': 0,
            'weight': 0,
            'updatetime': '2021-11-24 17:53:22',
            'createtime': '2021-11-24 17:53:22',
            'childs': []
          }
        ]
      }
    ],
    menus: []
  },
  mutations: {
    setData (state, data) {
      state.data = data
    },
    setMenus (state, data) {
      state.menus = data
    }
  },
  actions: {
    // 获取menus
    getMenus ({ commit }) {
      return new Promise((resolve, reject) => {
        getMenus().then(response => {
          commit('setMenus', response.data)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default menuBar
