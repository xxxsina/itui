<template>
    <div class="app-users-user">
        <el-container class="cls-container cls-container-op">
            <el-col style="white-space: nowrap;">
                <el-form :model="search" :rules="rulesSearch" ref="searchForm" :inline="true">
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
                title="修改"
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
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :page-size="100"
            layout="total, prev, pager, next"
            :total="999">
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
import detail from '@/views/member/userlog/detail'

export default {
  name: 'app-users-userlog',
  components: {
    'el-lee-detail': detail
  },
  methods: {
    cancel () {
      this.$refs.thisForm.reset()
    },
    handleDoc (index, column) {
      this.$refs.infoDetail.showDraw()
      this.row = column
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
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.page = val
      // this.getDataText()
    }
  },
  data () {
    return {
      currentPage: 1,
      search: {
        datetime: '', // ['2021-11-01 23:59:59', '2021-11-03 00:00:01'],
        content: ''
      },
      drawer: false,
      drawerSize: this.G.getDrawerSize(),
      row: {},
      tableData: [
        {
          id: '1',
          username: '13880789545',
          uid: 1,
          title: '日志标题',
          url: '/login',
          content: '{"__token__":"10b2d0acb2b977fd2d594fda6ab85674","username":"13880789545","captcha":"zEwj"}',
          ip: '172.22.0.1',
          useragent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36',
          createtime: '2021-11-01 14:53:03'
        },
        {
          id: '2',
          username: '13880789545',
          uid: 1,
          title: '日志标题22',
          url: '/logout',
          content: '操作内容22',
          ip: '操作IP地址22',
          useragent: '操作浏览器22',
          createtime: '2021-11-01 14:53:03'
        }
      ],
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
