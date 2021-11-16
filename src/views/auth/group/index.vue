<template>
  <div class="app-auth-group">
    <el-container class="cls-container cls-container-op">
      <el-col style="white-space: nowrap;">
        <el-button type="success" @click="reload" style="padding: 9px 12px;" title="刷新">
          <i class="el-icon-refresh"></i>
        </el-button>
        <el-button type="primary" @click="showDialogTool()" style="padding: 9px 12px;">
          <i class="el-icon-plus"></i>
          添加
        </el-button>
      </el-col>
    </el-container>
    <el-container class="cls-container cls-container-tab">
      <el-table
        :data="data.list"
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
          prop="name"
          label="名称"
          width="400">
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
          prop="updatetime"
          label="修改时间"
          width="200">
        </el-table-column>
        <el-table-column
          align="center"
          prop="createtime"
          label="创建时间"
          width="200">
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
          @current-change="handleCurrentChange"
          :current-page.sync="data.page"
          :page-size="data.limit"
          layout="total, prev, pager, next"
          :total="data.total">
        </el-pagination>
      </el-col>
    </el-container>

    <dialogTool ref="dialogTool" :data='dialogToolDataDefault'>
      <el-lee-edit
        ref="thisForm"
        slot="slotEditForm"
        :result='result'
        :data='dialogToolDataDefault'>
      </el-lee-edit>
    </dialogTool>
  </div>
</template>

<style scoped>
</style>

<script>
import { mapActions } from 'vuex'
import edit from '@/views/auth/group/edit'

export default {
  name: 'app-auth-group',
  components: {
    'el-lee-edit': edit
  },
  mounted () {
    // 绑定数据
    this.getList()
  },
  inject: ['reload'],
  methods: {
    ...mapActions([
      'getAuthGroupList',
      'editAuthGroup',
      'delAuthGroup'
    ]),
    cancel () {
      this.$refs.thisForm.reset()
    },
    // 显示表单
    showDialogTool () {
      // 显示dialog
      this.$refs.dialogTool.showDialog()
      this.$nextTick(() => {
        this.$refs.thisForm.$refs.rulesTree.setCheckedKeys([])
      })
    },
    // 编辑事件，触发后直接提取column数据传到dialog
    handleEdit (index, column) {
      this.dialogToolDataDefault.title = '修改'
      // 显示dialog
      this.$refs.dialogTool.showDialog()
      setTimeout(() => {
        this.$refs.thisForm.setData(column)
      })
    },
    // 修改状态
    handleEditStatus (index, column) {
      this.editAuthGroup({
        id: column.id,
        name: column.name,
        rules: column.rules,
        status: column.status
      }).then((res) => {
        this.$message.success(res.msg)
      })
    },
    // 删除事件
    handleDelete (index, column) {
      if (column.id === 1) {
        this.$message.error('超级权限禁止删除')
      } else {
        this.delAuthGroup({
          ids: column.id
        }).then((res) => {
          this.$message.success(res.msg)
          this.reload() // 局部刷新
        })
      }
    },
    // 翻页
    handleCurrentChange (page) {
      this.getList()
    },
    // 请求数据统一调用方法
    getList () {
      this.getAuthGroupList({
        page: this.data.page
      }).then((res) => {
        this.data = res.data
      })
    }
  },
  data () {
    return {
      data: {
        page: 1,
        limit: 1,
        total: 0,
        list: []
      },
      result: {
        id: 'add',
        name: '',
        rules: [],
        status: 1
      },
      dialogToolDataDefault: {
        title: '添加',
        visible: false
      }
    }
  }
}
</script>
