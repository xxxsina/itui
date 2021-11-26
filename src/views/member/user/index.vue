<template>
    <div class="app-users-user">
        <el-container class="cls-container cls-container-op">
            <el-col style="white-space: nowrap;">
                <el-form :model="search" :rules="rulesSearch" ref="searchForm" :inline="!this.G.isMobileInterView()">
                    <el-button type="success" @click="reload" style="padding: 9px 12px;" title="刷新">
                      <i class="el-icon-refresh"></i>
                    </el-button>
                    <el-button type="primary" @click="showDialogTool()" style="padding: 9px 12px;">
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
                        <el-input v-model="search.content" clearable placeholder="账号或者昵称"></el-input>
                    </el-form-item>
                    <el-button icon="el-icon-search" round @click="submitSearchForm('searchForm')"></el-button>
                </el-form>
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
            prop="username"
            label="账号"
            width="120">
              <template slot-scope="scope">
                <el-button type="text" @click="handleDoc(scope.$index, scope.row)">{{ scope.row.username }}</el-button>
              </template>
            </el-table-column>
            <el-table-column
            align="center"
            prop="profile.nickname"
            label="昵称"
            width="180">
            </el-table-column>
            <el-table-column
            align="center"
            prop="profile.avatar"
            label="头像"
            width="80">
            <template slot-scope="scope">
                <el-avatar :size="40" :src="G.imgHost + scope.row.profile.avatar">
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
            prop="profile.vip_expire_status"
            label="VIP过期状态"
            width="100">
              <template slot-scope="scope">
                <el-tag size="small" type="success" v-if="scope.row.profile.vip_expire_status==1">正常</el-tag>
                <el-tag size="small" type="danger" v-if="scope.row.profile.vip_expire_status==0">过期</el-tag>
              </template>
            </el-table-column>
            <el-table-column
            align="center"
            prop="profile.vip_expire_text"
            label="VIP过期时间"
            width="200">
              <template slot-scope="scope">
                {{ scope.row.profile.vip_expire_text }}
                <el-button
                circle
                title="修改"
                type='success'
                size="mini"
                icon="el-icon-edit"
                @click="handleEditVip(scope.$index, scope.row)"></el-button>
              </template>
            </el-table-column>
            <el-table-column
            align="center"
            prop="createtime"
            label="注册时间"
            width="160">
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
            <el-lee-edit ref="thisForm" slot="slotEditForm" :data='dialogToolDataDefault' :result='result'></el-lee-edit>
        </dialogTool>
        <!-- 详情：抽屉方式 -->
        <el-lee-detail ref="infoDetail" :result="row" :drawer="drawer"></el-lee-detail>
        <!-- vip编辑 -->
        <el-lee-edit-vip ref="thisFormVip"></el-lee-edit-vip>
    </div>
</template>

<style scoped>
</style>

<script>
import { mapActions } from 'vuex'
import detail from '@/views/member/user/detail'
import edit from '@/views/member/user/edit'
import editVip from '@/views/member/user/edit.vip'

export default {
  name: 'app-users-user',
  components: {
    'el-lee-detail': detail,
    'el-lee-edit': edit,
    'el-lee-edit-vip': editVip
  },
  // 局部刷新
  inject: ['reload'],
  mounted () {
    // 绑定数据
    this.getList()
  },
  methods: {
    ...mapActions([
      'getUserList',
      'editUser',
      'delUser'
    ]),
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
    // 编辑VIP
    handleEditVip (index, column) {
      // 显示dialog
      this.$refs.thisFormVip.showDialog()
      setTimeout(() => {
        this.$refs.thisFormVip.setData(column)
      })
    },
    // 修改状态
    handleEditStatus (index, column) {
      this.editUser({
        id: column.id,
        username: column.username,
        status: column.status
      }).then((res) => {
        this.$message.success(res.msg)
      }).catch(() => {
        column.status = column.status === 1 ? 0 : 1
        this.data.list[index] = column
      })
    },
    handleDoc (index, column) {
      this.$refs.infoDetail.showDraw()
      this.row = column
    },
    // 删除事件
    handleDelete (index, column) {
      this.delUser({
        ids: column.id
      }).then((res) => {
        this.$message.success(res.msg)
        this.reload() // 局部刷新
      })
    },
    // search form提交方法
    submitSearchForm (formName) {
      this.$refs[formName]
        .validate()
        .then(res => {
          this.loading = true
          this.getUserList({
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
      this.getUserList({
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
      data: {
        page: 1,
        limit: 1,
        total: 0,
        list: []
      },
      search: {
        datetime: '', // ['2021-11-01 23:59:59', '2021-11-03 00:00:01'],
        content: ''
      },
      drawer: false,
      drawerSize: this.G.getDrawerSize(),
      row: {
        profile: {}
      },
      result: {
        id: 'add',
        username: '',
        status: 1,
        profile: {
          nickname: '',
          avatar: '',
          vip_id: '',
          vip_expire: ''
        }
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
