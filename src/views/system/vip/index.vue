<template>
    <div class="app-users-vip">
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
            prop="name"
            label="VIP名称"
            width="200">
              <template slot-scope="scope">
                <el-button type="text" @click="handleDoc(scope.$index, scope.row)">{{ scope.row.name }}</el-button>
              </template>
            </el-table-column>
            <el-table-column
            align="center"
            prop="is_show"
            label="是否显示购买"
            width="200">
            <template slot-scope="scope">
                <el-tag size="small" type="success" v-if="scope.row.is_show==1">是</el-tag>
                <el-tag size="small" type="danger" v-else>否</el-tag>
            </template>
            </el-table-column>
            <el-table-column
            align="center"
            prop="is_sort"
            label="显示顺序(升序)"
            width="120">
            </el-table-column>
            <el-table-column
            align="center"
            prop="cost_price"
            label="原价¥"
            width="180">
            <template slot-scope="scope">
                <span class="cls-tb-content-line">{{ scope.row.cost_price }}</span>
            </template>
            </el-table-column>
            <el-table-column
            align="center"
            prop="price"
            label="现价格¥"
            width="120">
            </el-table-column>
            <el-table-column
            align="center"
            prop="period"
            label="月数"
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
                :inactive-value="0"
                @change="handleEditStatus(scope.$index, scope.row)"
                active-color="#13ce66">
              </el-switch>
            </template>
            </el-table-column>
            <el-table-column
            align="center"
            prop="createtime"
            label="创建时间"
            width="180">
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
        <!-- 编辑：弹窗方式 -->
        <dialogTool ref="dialogTool" :data='dialogToolDataDefault'>
            <el-lee-edit ref="thisForm" slot="slotEditForm" :data='dialogToolDataDefault' :result='result'></el-lee-edit>
        </dialogTool>
        <!-- 详情：抽屉方式 -->
        <el-lee-detail ref="codesDetail" :result="row" :drawer="drawer"></el-lee-detail>
    </div>
</template>

<style scoped>
</style>

<script>
import { mapActions } from 'vuex'
import detail from '@/views/system/vip/detail'
import edit from '@/views/system/vip/edit'

export default {
  name: 'app-users-vip',
  components: {
    'el-lee-detail': detail,
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
      'getAuthVipList',
      'editAuthVip',
      'delAuthVip'
    ]),
    cancel () {
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
    // 抽屉显示详情
    handleDoc (index, column) {
      column.rules_farmat = JSON.stringify(JSON.parse(column.rules), null, 2)
      this.$refs.codesDetail.showDraw()
      this.row = column
    },
    // 编辑事件，触发后直接提取column数据传到dialog
    handleEdit (index, column) {
      this.dialogToolDataDefault.title = '修改'
      column.rules_farmat = JSON.stringify(JSON.parse(column.rules), null, 2)
      // 显示dialog
      this.$refs.dialogTool.showDialog()
      // 重置set表单的值,这里有个坑，父组件调用子组件方法要加一个延时，因为子组件还没渲染
      setTimeout(() => {
        this.$refs.thisForm.setData(column)
      })
    },
    // 修改状态
    handleEditStatus (index, column) {
      this.editAuthVip({
        id: column.id,
        name: column.name,
        price: column.price,
        period: column.period,
        rules: column.rules,
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
      this.delAuthVip({
        ids: column.id
      }).then((res) => {
        this.$message.success(res.msg)
        this.reload() // 局部刷新
      })
    },
    // 批量删除
    handleDeleteBatch () {
      if (this.multipleSelection.length) {
        let ids = []
        this.multipleSelection.forEach(row => {
          ids.push(row.id)
        })
        this.delAuthVip({
          ids: ids
        }).then((res) => {
          this.$message.success(res.msg)
          this.reload() // 局部刷新
        })
      } else {
        this.$message.error('请选择要删除的数据')
      }
    },
    // 翻页
    handleCurrentChange (page) {
      this.getList()
    },
    // 请求数据统一调用方法
    getList () {
      this.loading = true
      this.getAuthVipList().then((res) => {
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
      drawer: false,
      row: {},
      drawerSize: this.G.getDrawerSize(),
      data: {
        page: 1,
        limit: 1,
        total: 0,
        list: []
      },
      result: {
        id: 'add',
        name: '',
        status: 1,
        is_show: 0,
        is_sort: '',
        price: '',
        cost_price: '',
        period: '',
        rules: '',
        rules_farmat: ''
      }
    }
  }
}
</script>
