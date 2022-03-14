<template>
  <div class="app-system-hosts">
    <el-container class="cls-container cls-container-op">
      <el-col style="white-space: nowrap;">
        <el-button type="success" @click="reload" style="padding: 9px 12px;" title="刷新">
          <i class="el-icon-refresh"></i>
        </el-button>
        <el-button type="primary" @click="showDialogTool()" style="padding: 9px 12px;margin-left: 0px;">
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
        v-loading="loading"
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
          prop="is_vip"
          label="VIP独享"
          width="100">
            <template slot-scope="scope">
                <el-tag size="small" type="success" v-if="scope.row.is_vip==1">是</el-tag>
                <el-tag size="small" type="danger" v-else>否</el-tag>
            </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="is_sort"
          label="排序[升序]"
          width="100">
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
    <!-- 编辑：弹窗方式 -->
    <dialogTool ref="dialogTool" :data='dialogToolDataDefault'>
      <el-lee-edit ref="thisForm" slot="slotEditForm" :result='result' :data='dialogToolDataDefault'></el-lee-edit>
    </dialogTool>
  </div>
</template>

<style scoped>
</style>

<script>
import { mapActions } from 'vuex'
import edit from '@/views/system/hosts/edit'

export default {
  name: 'app-system-hosts',
  components: {
    'el-lee-edit': edit
  },
  // 局部刷新
  inject: ['reload'],
  mounted () {
    // 绑定数据
    this.getList()
  },
  methods: {
    ...mapActions([
      'getHostsList',
      'editHosts',
      'delHosts'
    ]),
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
    // 修改状态
    handleEditStatus (index, column) {
      this.editHosts({
        id: column.id,
        title: column.title,
        host: column.host,
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
      this.delHosts({
        ids: column.id
      }).then((res) => {
        this.$message.success(res.msg)
        this.reload() // 局部刷新
      })
    },
    // 请求数据统一调用方法
    getList () {
      this.getHostsList().then((res) => {
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
      dialogToolDataDefault: {
        title: '添加',
        visible: false
      },
      data: {
        page: 1,
        limit: 1,
        total: 0,
        list: []
      },
      result: {
        id: 'add',
        title: '',
        host: '',
        status: 1,
        hot: 0,
        is_vip: 0,
        is_sort: ''
      }
    }
  }
}
</script>
