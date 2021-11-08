<template>
  <div class="app-system-hosts">
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
          prop="title"
          label="名称[title]"
          width="200">
        </el-table-column>
        <el-table-column
          align="center"
          prop="host"
          label="域名[http]"
          width="200">
        </el-table-column>
        <el-table-column
          align="center"
          prop="hot"
          label="是否标记HOT"
          width="100">
            <template slot-scope="scope">
                <el-tag size="small" type="success" v-if="scope.row.hot==1">是</el-tag>
                <el-tag size="small" type="danger" v-else>否</el-tag>
            </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="sorting"
          label="排序[升序]"
          width="100">
        </el-table-column>
        <el-table-column
          align="center"
          prop="status"
          label="状态"
          width="100">
          <template slot-scope="scope">
            <el-tag type="success" v-if="scope.row.status == 1">正常</el-tag>
            <el-tag type="danger" v-else>隐藏</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="createtime"
          label="创建时间"
          width="200">
        </el-table-column>
        <el-table-column
          align="center"
          prop="updatetime"
          label="修改时间"
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
    <!-- 编辑：弹窗方式 -->
    <dialogTool ref="dialogTool" :data='dialogToolDataDefault'>
      <el-lee-edit ref="thisForm" slot="slotEditForm" :result='result' :data='dialogToolDataDefault'></el-lee-edit>
    </dialogTool>
  </div>
</template>

<style scoped>
</style>

<script>
import edit from '@/views/system/hosts/edit'

export default {
  name: 'app-system-hosts',
  components: {
    'el-lee-edit': edit
  },
  // 局部刷新
  inject: ['reload'],
  methods: {
    // 重置表单
    cancel () {
      this.$refs.thisForm.reset()
    },
    // 添加显示表单
    showDialogTool () {
      // 显示dialog
      this.$refs.dialogTool.showDialog()
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
      dialogToolDataDefault: {
        title: '添加',
        visible: false
      },
      result: {
        id: 'add',
        title: '',
        host: '',
        status: 1,
        hot: 0,
        sorting: '',
        is_delete: 0,
        admin_id: 0,
        updatetime: '',
        createtime: ''
      },
      tableData: [{
        id: 1,
        title: 's0o2.cn',
        host: 'http://s0o2.cn',
        status: 1,
        hot: 0,
        sorting: 2,
        is_delete: 0,
        admin_id: 1,
        updatetime: '2021-11-06 08:11:32',
        createtime: '2021-11-01 10:10:10'
      }, {
        id: 2,
        title: 'i8jo.cn',
        host: 'http://i8jo.cn',
        status: 0,
        hot: 1,
        sorting: 1,
        is_delete: 0,
        admin_id: 1,
        updatetime: '2021-11-06 08:11:32',
        createtime: '2021-11-01 10:10:10'
      }]
    }
  }
}
</script>
