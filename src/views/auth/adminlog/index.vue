<template>
    <div class="app-auth-adminlog">
        <el-container class="cls-container cls-container-op">
            <el-col style="white-space: nowrap;">
                <el-form :model="search" :rules="rulesSearch" ref="searchForm" :inline="true">
                  <el-button type="success" @click="reload" style="padding: 9px 12px;" title="刷新">
                    <i class="el-icon-refresh"></i>
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
                      <el-input v-model="search.content" clearable placeholder="账号"></el-input>
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
            width="300">
            </el-table-column>
            <el-table-column
            align="center"
            prop="title"
            label="操作名称"
            width="300">
            </el-table-column>
            <el-table-column
            align="center"
            prop="url"
            label="操作地址"
            width="300">
            </el-table-column>
            <el-table-column
            align="center"
            prop="createtime"
            label="操作时间"
            width="200">
            </el-table-column>
            <el-table-column
            align="center"
            prop="op"
            label="操作">
            <template slot-scope="scope">
                <el-button
                title="详情"
                type='success'
                plain
                size="mini"
                icon="el-icon-tickets"
                @click="handleDoc(scope.$index, scope.row)"></el-button>
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
        <!-- 详情：抽屉方式 -->
        <el-lee-detail ref="infoDetail" :result="row" :drawer="drawer"></el-lee-detail>
    </div>
</template>

<style scoped>
</style>

<script>
import { mapActions } from 'vuex'
import detail from '@/views/auth/adminlog/detail'

export default {
  name: 'app-auth-adminlog',
  components: {
    'el-lee-detail': detail
  },
  // 局部刷新
  inject: ['reload'],
  mounted () {
    // 绑定数据
    this.getList()
  },
  methods: {
    ...mapActions([
      'getAdminLogList'
    ]),
    cancel () {
      this.$refs.thisForm.reset()
    },
    handleDoc (index, column) {
      this.$refs.infoDetail.showDraw()
      column.content_farmat = JSON.stringify(JSON.parse(column.content), null, 2)
      this.row = column
    },
    // search form提交方法
    submitSearchForm (formName) {
      this.$refs[formName]
        .validate()
        .then(res => {
          this.getAdminLogList({
            search: this.search,
            page: 1
          }).then((res) => {
            this.data = res.data
          })
        })
    },
    // 翻页
    handleCurrentChange (page) {
      this.getList()
    },
    // 请求数据统一调用方法
    getList () {
      this.getAdminLogList({
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
      search: {
        datetime: '', // ['2021-11-01 23:59:59', '2021-11-03 00:00:01'],
        content: ''
      },
      drawer: false,
      drawerSize: this.G.getDrawerSize(),
      row: {},
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
