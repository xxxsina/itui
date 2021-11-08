<template>
  <div class="app-auth-group">
    <el-container class="cls-container cls-container-op">
      <el-button type="primary" @click="showDialogTool()" style="padding: 9px 12px;">
        <i class="el-icon-plus"></i>
        添加
      </el-button>
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
            <el-col v-if="scope.row.status == 1" style="color: #67C23A">正常</el-col>
            <el-col v-else style="color: #909399">隐藏</el-col>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="created"
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

    <dialogTool ref="dialogTool" :data='dialogToolDataDefault'>
      <el-lee-edit ref="thisForm" slot="slotEditForm" :result='result' :data='dialogToolDataDefault'></el-lee-edit>
    </dialogTool>
  </div>
</template>

<style scoped>
</style>

<script>

import edit from '@/views/auth/group/edit'

export default {
  name: 'app-auth-group',
  components: {
    'el-lee-edit': edit
  },
  mounted () {
  },
  inject: ['reload'],
  methods: {
    cancel () {
      this.$refs.thisForm.reset()
      this.result.openPanel = false
    },
    // 显示表单
    showDialogTool () {
      // 显示dialog
      this.$refs.dialogTool.showDialog()
      this.result.openPanel = true
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
    // 删除事件
    handleDelete (index, column) {
      console.log(index)
      console.log(column)
      this.reload() // 局部刷新
    }
  },
  data () {
    return {
      name: '',
      page: 1,
      result: {
        id: 'add',
        name: '',
        rule: [],
        status: '',
        openPanel: false
      },
      dialogToolDataDefault: {
        title: '添加',
        visible: false
      },
      tableData: [{
        id: 1,
        name: '超级管理组',
        status: 2,
        rule: [1, 2, 3],
        created: '2021-11-01 10:10:10'
      }]
    }
  }
}
</script>
