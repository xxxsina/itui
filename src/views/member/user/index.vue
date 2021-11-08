<template>
    <div class="app-users-user">
        <el-container class="cls-container cls-container-op">
            <el-col style="white-space: nowrap;">
                <el-form :model="search" :rules="rulesSearch" ref="searchForm" :inline="true">
                    <el-button type="primary" @click="showDialogTool()" style="padding: 9px 12px;">
                        <i class="el-icon-plus"></i>
                        添加
                    </el-button>
                    <el-form-item prop="datetime">
                        <el-date-picker
                            v-model="search.datetime"
                            type="datetimerange"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item prop="content">
                        <el-input v-model="search.content" clearable placeholder="账号或者昵称"></el-input>
                    </el-form-item>
                        <el-button icon="el-icon-search" round @click="submitSearchForm('searchForm')"></el-button>
                    </el-form>
            </el-col>
        </el-container>
        <el-container class="cls-container cls-container-tab">
        <el-table
            :data="tableData"
            row-key="id"
            border
            default-expand-all
            :cell-style="{padding:'0px'}"
            :row-style="{height:'34px'}"
            :tree-props="{children: 'childs'}"
            style="width: 100%">
            <el-table-column
            align="center"
            prop="id"
            label="ID"
            width="80">
            </el-table-column>
            <el-table-column
            align="center"
            prop="username"
            label="账号"
            width="200">
              <template slot-scope="scope">
                <el-button type="text" @click="handleDoc(scope.$index, scope.row)">{{ scope.row.username }}</el-button>
              </template>
            </el-table-column>
            <el-table-column
            align="center"
            prop="nickname"
            label="昵称"
            width="200">
            </el-table-column>
            <el-table-column
            align="center"
            prop="avatar"
            label="头像"
            width="120">
            <template slot-scope="scope">
                <el-avatar :size="40" :src="scope.row.avatar" @error="errorHandler">
                    <img :src="G.imgErrPath" />
                </el-avatar>
            </template>
            </el-table-column>
            <el-table-column
            align="center"
            prop="logintime"
            label="最后登录时间"
            width="180">
            </el-table-column>
            <el-table-column
            align="center"
            prop="loginip"
            label="最后登录IP"
            width="120">
            </el-table-column>
            <el-table-column
            align="center"
            prop="viptime"
            label="VIP过期时间"
            width="180">
            </el-table-column>
            <el-table-column
            align="center"
            prop="createtime"
            label="注册时间"
            width="180">
            </el-table-column>
            <el-table-column
            align="center"
            prop="status"
            label="状态"
            width="100">
            <template slot-scope="scope">
                <el-switch
                v-model="scope.row.status"
                :value="scope.row.status"
                :active-value="1"
                :inactive-value="2"
                active-color="#13ce66">
                </el-switch>
            </template>
            </el-table-column>
            <el-table-column
            align="center"
            prop="op"
            label="操作">
            <template slot-scope="scope">
                <el-button
                title="修改"
                type='primary'
                size="mini"
                icon="el-icon-edit"
                @click="handleEdit(scope.$index, scope.row)"></el-button>
                <el-popconfirm
                confirm-button-text='确定'
                cancel-button-text='不用了'
                icon="el-icon-info"
                icon-color="red"
                title="你确定要删除该条内容吗？"
                @confirm="handleDelete(scope.$index, scope.row)">
                    <el-button
                    slot="reference"
                    title="删除"
                    size="mini"
                    type="danger"
                    icon="el-icon-delete"></el-button>
                </el-popconfirm>
            </template>
            </el-table-column>
        </el-table>
        </el-container>
        <el-container class="cls-container cls-container-page">
        <el-col>
            <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :page-size="100"
            layout="total, prev, pager, next"
            :total="999">
            </el-pagination>
        </el-col>
        </el-container>

        <dialogTool ref="dialogTool" :data='dialogToolDataDefault'>
            <el-lee-edit ref="thisForm" slot="slotEditForm" :data='dialogToolDataDefault' :result='result'></el-lee-edit>
        </dialogTool>
        <!-- 详情：抽屉方式 -->
        <el-lee-detail ref="infoDetail" :result="row" :drawer="drawer"></el-lee-detail>
    </div>
</template>

<style scoped>
/* .cls-draw >>> header {
    background-color: #2c3e50;
    line-height: 50px;
    padding: 0 20px;
    color: white;
}
.cls-draw-desc {
    margin: 0  10px;
}
.el-button {
    margin-left: unset;
}
.cls-draw >>> .cls-tb-label {
    background: #E1F3D8;
    font-weight: bold;
}
.cls-draw >>> .cls-tb-content {
    background: #FDE2E2;
    font-weight: bold;
} */
</style>

<script>
import detail from '@/views/member/user/detail'
import edit from '@/views/member/user/edit'

export default {
  name: 'app-users-user',
  components: {
    'el-lee-detail': detail,
    'el-lee-edit': edit
  },
  methods: {
    errorHandler () {
      return true
    },
    cancel () {
      this.$refs.thisForm.reset()
    },
    // 显示表单
    showDialogTool () {
      // 显示dialog
      this.$refs.dialogTool.showDialog()
    },
    // 编辑事件，触发后直接提取column数据传到dialog
    handleEdit (index, column) {
      this.dialogToolDataDefault.title = '修改'
      // 显示dialog
      this.$refs.dialogTool.showDialog()
      // 重置set表单的值,这里有个坑，父组件调用子组件方法要加一个延时，因为子组件还没渲染
      setTimeout(() => {
        this.$refs.thisForm.setData(column)
      })
    },
    handleDoc (index, column) {
      this.$refs.infoDetail.showDraw()
      this.row = column
    },
    // 删除事件
    handleDelete (index, column) {
      console.log(index)
      console.log(column)
    },
    // search form提交方法
    submitSearchForm (formName) {
      this.$refs[formName]
        .validate()
        .then(res => {
          console.log(this.search)
          // this.fresh()
        })
        // eslint-disable-next-line handle-callback-err
        .catch(err => {
          console.log(err)
          console.log('error submit!!')
        })
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.page = val
      // this.getDataText()
    }
  },
  data () {
    return {
      dialogToolDataDefault: {
        title: '添加',
        visible: false
      },
      currentPage: 1,
      search: {
        datetime: '', // ['2021-11-01 23:59:59', '2021-11-03 00:00:01'],
        content: ''
      },
      drawer: false,
      drawerSize: this.G.getDrawerSize(),
      row: {},
      result: {
        id: 'add',
        username: '',
        nickname: '',
        avatar: '',
        createtime: '',
        joinip: '',
        loginfailure: 0,
        loginip: '',
        logintime: '',
        prevtime: '',
        status: 1,
        viptime: ''
      },
      tableData: [
        {
          id: '1000000',
          username: '13880789545',
          nickname: 'xxxsina1111',
          avatar: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
          group_name: '超级管理员',
          status: 2,
          loginfailure: 2,
          loginip: '127.0.0.111',
          logintime: '2021-11-01 14:53:03',
          prevtime: '2021-11-01 14:53:03',
          viptime: '2021-11-01 14:53:03',
          joinip: '192.168.999.222',
          createtime: '2021-11-01 14:53:03'
        },
        {
          id: '99999999',
          username: '13880789545',
          nickname: 'xxxsina2222',
          avatar: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
          group_name: '超级管理员',
          status: 1,
          loginfailure: 0,
          loginip: '127.0.0.111',
          logintime: '2021-11-01 14:53:03',
          prevtime: '2021-11-01 14:53:03',
          viptime: '2021-11-01 14:53:03',
          joinip: '192.168.999.222',
          createtime: '2021-11-01 14:53:03'
        }
      ],
      rulesSearch: {
        content: [
          { min: 1, max: 15, message: '长度在 1 到 15 个字符', trigger: 'blur' },
          {
            validator: (rule, value, callback) => {
              if (!value && !this.search.datetime) {
                return callback(new Error('请填写搜索内容'))
              }
              // 如果callback()代表验证通过
              return callback()
            }
          }
        ]
      }
    }
  }
}
</script>
