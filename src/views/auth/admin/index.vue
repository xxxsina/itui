<template>
  <div class="app-auth-rule">
    <el-container class="cls-container cls-container-op">
      <el-col style="white-space: nowrap;">
        <el-form :model="search" :rules="rulesSearch" ref="searchForm" :inline="!this.G.isMobileInterView()">
          <el-button type="success" @click="reload" style="padding: 9px 12px;" title="刷新">
            <i class="el-icon-refresh"></i>
          </el-button>
          <el-button type="primary" @click="showDialogTool()" style="padding: 9px 12px;margin-left: 0px;">
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
        ref="multipleTable"
        :data="data.list"
        row-key="id"
        border
        v-loading="loading"
        default-expand-all
        @selection-change="handleSelectionChange"
        :cell-style="{padding:'0px'}"
        :row-style="{height:'34px'}"
        :tree-props="{children: 'childs'}"
        style="width: 100%">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
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
          label="所属权限组"
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
              :inactive-value="0"
              @change="handleEditStatus(scope.$index, scope.row)"
              active-color="#13ce66">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="loginip"
          label="登录IP地址"
          width="200">
        </el-table-column>
        <el-table-column
          align="center"
          prop="logintime"
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
              @click="handleEditPop(scope.$index, scope.row)"></el-button>
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
      <el-col :sm="4" style="text-align:left;">
        <el-popconfirm
          confirm-button-text='确定'
          cancel-button-text='不用了'
          icon="el-icon-info"
          icon-color="red"
          title="你确定要删除该条内容吗？"
          @confirm="handleDeleteBatch()">
            <el-button slot="reference" type="danger">批量删除</el-button>
          </el-popconfirm>
      </el-col>
      <el-col>
        <el-pagination
          background
          @current-change="handleCurrentChange"
          :current-page.sync="data.page"
          :page-size="data.limit"
          layout="total, prev, pager, next"
          :total="data.total">
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
  inject: ['reload'],
  mounted () {
    // 绑定数据
    this.getList()
  },
  computed: {
    // eslint-disable-next-line no-undef
    ...mapGetters([
      'menuBar'
    ])
  },
  methods: {
    ...mapActions([
      'getAdminList',
      'editAdmin',
      'delAdmin'
    ]),
    cancel () {
      // console.log('我是爸爸')
      this.$refs.thisForm.reset()
    },
    // 批量选中
    handleSelectionChange (row) {
      this.multipleSelection = row
    },
    // 显示表单
    showDialogTool () {
      // 显示dialog
      this.$refs.dialogTool.showDialog()
    },
    // 编辑事件，触发后直接提取column数据传到dialog
    handleEditPop (index, column) {
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
    // 修改状态
    handleEditStatus (index, column) {
      this.editAdmin({
        id: column.id,
        username: column.username,
        group_id: column.group_id,
        status: column.status
      }).then((res) => {
        this.$message.success(res.msg)
      }).catch(() => {
        column.status = column.status === 1 ? 0 : 1
        this.data.list[index] = column
      })
    },
    // 删除事件
    handleDelete (index, column) {
      // console.log(column.id)
      if (column.id === 1) {
        this.$message.error('无操作权限')
      } else {
        this.delAdmin({
          ids: column.id
        }).then((res) => {
          this.$message.success(res.msg)
          this.reload() // 局部刷新
        })
      }
    },
    // 批量删除
    handleDeleteBatch () {
      if (this.multipleSelection.length) {
        let ids = []
        this.multipleSelection.forEach(row => {
          ids.push(row.id)
        })
        this.delAdmin({
          ids: ids
        }).then((res) => {
          this.$message.success(res.msg)
          this.reload() // 局部刷新
        })
      } else {
        this.$message.error('请选择要删除的数据')
      }
    },
    // search form提交方法
    submitSearchForm (formName) {
      this.$refs[formName]
        .validate()
        .then(res => {
          this.loading = true
          this.getAdminList({
            search: this.search,
            page: 1
          }).then((res) => {
            this.data = res.data
            this.loading = false
          }).catch(() => {
            this.loading = false
          })
        })
    },
    // 翻页
    handleCurrentChange (page) {
      this.getList()
    },
    // 请求数据统一调用方法
    getList () {
      this.loading = true
      this.getAdminList({
        page: this.data.page
      }).then((res) => {
        this.data = res.data
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    }
  },
  data () {
    return {
      loading: true,
      drawer: false,
      data: {
        page: 1,
        limit: 1,
        total: 0,
        list: []
      },
      search: {},
      multipleSelection: [],
      result: {
        id: 'add',
        username: '',
        nickname: '',
        group_id: '',
        status: 1
      },
      dialogToolDataDefault: {
        title: '添加',
        visible: false
      },
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
