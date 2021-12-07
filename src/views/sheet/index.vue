<template>
    <div class="app-sheet">
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
                  <el-form-item prop="datetime" v-if="!this.G.isMobileInterView()">
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
                      <el-input v-model="search.content" clearable placeholder="账号、表单名称或备注"></el-input>
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
              align="center"
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
            label="用户账号"
            width="100">
            </el-table-column>
            <el-table-column
            align="center"
            prop="short_url_text"
            label="表单连接"
            width="240">
              <template slot-scope="scope">
                <el-input placeholder="请输入内容" v-model="scope.row.short_url_text" :id="'link' + scope.row.id" class="cls-tb-url-input">
                  <template slot="append">
                    <el-button
                     title="复制连接"
                     icon="el-icon-document-copy"
                     class="cpbtn"
                     circle size="mini"
                     @click="copyLink"
                     data-clipboard-action="copy"
                     :data-clipboard-target="'#link' + scope.row.id">
                    </el-button>
                  </template>
                </el-input>
              </template>
            </el-table-column>
            <el-table-column
            align="center"
            prop="name"
            label="表单名称"
            width="140">
              <template slot-scope="scope">
                <el-button type="text" @click="handleDoc(scope.$index, scope.row)">{{ scope.row.name }}</el-button>
              </template>
            </el-table-column>
            <el-table-column
            align="center"
            prop="remark"
            label="备注"
            width="200">
            </el-table-column>
            <el-table-column
            align="center"
            prop="total"
            label="填写次数"
            width="70">
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
            width="140">
            </el-table-column>
            <el-table-column
            align="center"
            prop="op"
            class="cls-op"
            label="操作">
            <template slot-scope="scope">
                <el-button
                title="数据"
                type='success'
                size="mini"
                icon="el-icon-document"
                @click="handleLink(scope.$index, scope.row)">
                </el-button>
                <el-button
                style="margin-left: 0px;"
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
.cls-tb-url-input >>> input {
  height: 26px;
  line-height: 26px;
}
.cpbtn {
  margin-left: -20px;
}
</style>

<script>
import { mapActions } from 'vuex'
import Clipboard from 'clipboard'
import detail from '@/views/sheet/detail'
import edit from '@/views/sheet/edit'
import list from '@/views/sheet/form/index'

export default {
  name: 'app-sheet',
  components: {
    'el-lee-detail': detail,
    'el-lee-edit': edit,
    'el-lee-list': list
  },
  // 局部刷新
  inject: ['reload'],
  mounted () {
    // 绑定数据
    this.getList()
  },
  methods: {
    ...mapActions([
      'getFormList',
      'editForm',
      'delForm'
    ]),
    cancel () {
      this.$refs.thisForm.reset()
    },
    // 复制连接
    copyLink () {
      let clipboard = new Clipboard('.cpbtn')
      clipboard.on('success', e => {
        this.$message.success('复制成功')
        clipboard.destroy() // 使用destroy可以清楚缓存
      })
      clipboard.on('error', e => {
        this.$message.error('复制失败')
        clipboard.destroy()
      })
    },
    // 显示表单
    showDialogTool () {
      // 显示dialog
      this.$refs.dialogTool.showDialog()
      this.$nextTick(() => {
        this.$refs.thisForm.disabled = false
      })
    },
    // 编辑事件，触发后直接提取column数据传到dialog
    handleEdit (index, column) {
      this.dialogToolDataDefault.title = '修改'
      // 显示dialog
      this.$refs.dialogTool.showDialog()
      // 重置set表单的值,这里有个坑，父组件调用子组件方法要加一个延时，因为子组件还没渲染
      setTimeout(() => {
        this.$refs.thisForm.setData(column)
        this.$refs.thisForm.disabled = !!column.uid
      })
    },
    // 修改状态
    handleEditStatus (index, column) {
      this.editForm({
        id: column.id,
        name: column.name,
        url: column.url,
        image: column.image,
        short_url: column.short_url,
        status: column.status
      }).then((res) => {
        this.$message.success(res.msg)
      }).catch(() => {
        column.status = column.status === 1 ? 0 : 1
        this.data.list[index] = column
      })
    },
    // 详情抽屉
    handleDoc (index, column) {
      // this.drawer = true
      this.$refs.codesDetail.showDraw()
      this.row = column
    },
    // 按钮跳转到formlog页面
    handleLink (index, column) {
      // name : sheet/form 为router/index.js里面的name
      this.$router.push({name: 'sheet/form', params: {'parent_id': column.id}})
    },
    // 删除事件
    handleDelete (index, column) {
      this.delForm({
        ids: column.id
      }).then((res) => {
        this.$message.success(res.msg)
        this.reload() // 局部刷新
      })
    },
    // 批量选中
    handleSelectionChange (row) {
      this.multipleSelection = row
    },
    // 批量删除
    handleDeleteBatch () {
      if (this.multipleSelection.length) {
        let ids = []
        this.multipleSelection.forEach(row => {
          ids.push(row.id)
        })
        this.delForm({
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
          this.getFormList({
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
      this.getFormList({
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
      dialogToolDataDefault: {
        title: '添加',
        visible: false
      },
      multipleSelection: [],
      data: {
        page: 1,
        limit: 1,
        total: 0,
        list: []
      },
      row: {},
      search: {
        datetime: '', // ['2021-11-01 23:59:59', '2021-11-03 00:00:01'],
        content: ''
      },
      drawer: false,
      result: {
        id: 'add',
        uid: 0,
        username: '',
        name: '',
        status: 1,
        short_url: '',
        total_limit: 0,
        remark: '',
        url: '', // 填写完后跳转地址
        image_id: 0, // 填写完后显示二维码ID
        image: '', // 填写完后显示二维码
        is_realname: 1, // 是否填写姓名
        is_phone: 1, // 是否填写电话
        is_image: 0 // 是否上传截图
      },
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
