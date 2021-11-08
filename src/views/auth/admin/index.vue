<template>
  <div class="app-auth-rule">
    <el-container class="cls-container cls-container-op">
      <el-col style="white-space: nowrap;">
        <el-form :model="search" :rules="rulesSearch" ref="searchForm" :inline="true">
          <el-button type="primary" @click="showDialogTool()" style="padding: 9px 12px;">
            <i class="el-icon-plus"></i>
            添加
          </el-button>
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
        </el-table-column>
        <el-table-column
          align="center"
          prop="nickname"
          label="昵称"
          width="200">
        </el-table-column>
        <el-table-column
          align="center"
          prop="group_name"
          label="权限组"
          width="220">
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
              @change="setIsMenu({'status': $event, 'id': scope.row.id})"
              active-color="#13ce66">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="ip"
          label="登录IP地址"
          width="200">
        </el-table-column>
        <el-table-column
          align="center"
          prop="lastlogintime"
          label="最后登录时间"
          width="300">
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
      <el-lee-edit ref="thisForm" slot="slotEditForm" :result='result' :data='dialogToolDataDefault'></el-lee-edit>
    </dialogTool>

  </div>
</template>

<style scoped>
</style>

<script>
import { mapGetters, mapActions } from 'vuex'
import edit from '@/views/auth/admin/edit'

export default {
  name: 'app-auth-rule',
  components: {
    'el-lee-edit': edit
  },
  mounted () {
  },
  computed: {
    // eslint-disable-next-line no-undef
    ...mapGetters([
      'menuBar'
    ])
  },
  methods: {
    ...mapActions([
      'setIsMenu'
    ]),
    cancel () {
      // console.log('我是爸爸')
      this.$refs.thisForm.reset()
    },
    // handler
    handler (row) {
      // console.log(row)
      this.drawer = true
      this.name = row.title
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
      // 重试set表单的值,这里有个坑，父组件调用子组件方法要加一个延时，因为子组件还没渲染
      setTimeout(() => {
        this.$refs.thisForm.setData(column)
      })
      // 重试set表单的值，Object.assign这个是相当于重置对象里面所有项
      // Object.assign(this.result, resultNew)
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
    async getLogin () {
      let _data = {
        'username': '20190901006',
        'password': '423423',
        'page': this.page
      }
      let params = {
        type: 'npcxxxx'
      }
      console.log('xxxxxxx start xxxxxxxx')
      // eslint-disable-next-line no-undef
      // let rs = this.$cookie.set('token', '3333')
      // console.log(rs)
      try {
        let res = await this.$api.matches.login(_data, params)
        this.$message.success(res.message)
        if (res.data) {
          this.$cookie.set('token', res.data.token, { expires: '10s' })
        }
      } catch (e) {
        console.log('​catch -> e', e)
      }
      console.log('xxxxxxx end xxxxxxxx')
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.currentPage = val
      // this.getDataText()
    }
  },
  data () {
    return {
      drawer: false,
      name: '',
      currentPage: 1,
      search: {},
      result: {
        id: 'add',
        username: '',
        nickname: '',
        group_id: '',
        group_name: '',
        status: 1,
        ip: '',
        lastlogintime: ''
      },
      dialogToolDataDefault: {
        title: '添加',
        visible: false
      },
      tableData: [
        {
          id: '1',
          username: '13880789545',
          nickname: 'xxxsina',
          group_id: '2',
          group_name: '超级管理员',
          status: 2,
          ip: '127.0.0.1',
          lastlogintime: '2021-11-01 14:53:03'
        }
      ],
      rulesSearch: {
        content: [
          { required: true, message: '请填写查询内容', trigger: 'change' },
          { min: 1, max: 15, message: '长度在 1 到 15 个字符', trigger: 'blur' }
        ]
      }
    }
  }
}
</script>
