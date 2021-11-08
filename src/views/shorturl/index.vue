<template>
    <div class="app-sheet">
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
                        <el-input v-model="search.content" clearable placeholder="用户账号、短连接名称"></el-input>
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
            label="用户账号"
            width="100">
            </el-table-column>
            <el-table-column
            align="center"
            prop="url_addr"
            label="短连接"
            width="240">
              <template slot-scope="scope">
                <el-input placeholder="请输入内容" v-model="scope.row.url_addr" :id="'link' + scope.row.id" class="cls-tb-url-input">
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
            label="名称"
            width="140">
              <template slot-scope="scope">
                <el-button type="text" @click="handleDoc(scope.$index, scope.row)">{{ scope.row.name }}</el-button>
              </template>
            </el-table-column>
            
            <el-table-column
            align="center"
            prop="url_addr"
            label="原连接"
            width="300">
              <template slot-scope="scope">
                <el-input placeholder="请输入内容" v-model="scope.row.url" :id="'alink' + scope.row.id" class="cls-tb-url-input">
                  <template slot="append">
                    <el-button
                     title="复制连接"
                     icon="el-icon-document-copy"
                     class="cpbtn"
                     circle size="mini"
                     @click="copyLink"
                     data-clipboard-action="copy"
                     :data-clipboard-target="'#alink' + scope.row.id">
                    </el-button>
                  </template>
                </el-input>
              </template>
            </el-table-column>
            <el-table-column
            align="center"
            prop="total"
            label="访问次数"
            width="70">
            </el-table-column>
            <el-table-column
            align="center"
            prop="createtime"
            label="创建时间"
            width="140">
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
                  :inactive-value="2"
                  active-color="#13ce66">
                  </el-switch>
              </template>
            </el-table-column>
            <el-table-column
            align="center"
            prop="op"
            class="cls-op"
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
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :page-size="100"
            layout="total, prev, pager, next"
            :total="999">
            </el-pagination>
        </el-col>
        </el-container>
        <!-- 编辑：弹窗方式 -->
        <dialogTool ref="dialogTool" :data='dialogToolDataDefault'>
            <el-lee-edit ref="thisForm" slot="slotEditForm" :data='dialogToolDataDefault' :result='result'></el-lee-edit>
        </dialogTool>
        <!-- 详情：抽屉方式 -->
        <el-lee-detail ref="codesDetail" :result="result" :drawer="drawer"></el-lee-detail>
    </div>
</template>

<style scoped>
.cls-tb-url-input >>> input {
  height: 26px;
  line-height: 26px;
}
.el-button {
  margin-left: unset;
}
.cpbtn {
  margin-left: -20px;
}
</style>

<script>
import Clipboard from 'clipboard'
import detail from '@/views/shorturl/detail'
import edit from '@/views/shorturl/edit'

export default {
  name: 'app-sheet',
  components: {
    'el-lee-detail': detail,
    'el-lee-edit': edit
  },
  methods: {
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
    // 详情抽屉
    handleDoc (index, column) {
      // this.drawer = true
      this.$refs.codesDetail.showDraw()
      this.result = column
    },
    // 按钮跳转
    handleLink (index, column) {
      this.$router.push({name: 'sheet/list', params: {'parent_id': column.id}})
    },
    // 删除事件
    handleDelete (index, column) {
      console.log(index)
      console.log(column)
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
      dialogToolDataDefault: {
        title: '添加',
        visible: false
      },
      currentPage: 1,
      search: {
        datetime: '', // ['2021-11-01 23:59:59', '2021-11-03 00:00:01'],
        content: ''
      },
      drawer: false,
      result: {
        id: '',
        uid: '',
        username: '',
        name: '',
        status: 0,
        short_url: '',
        url_addr: '',
        is_delete: '',
        total_limit: 0,
        total: 0,
        url: '',
        pwd: '',
        effective_time: 0,
        period: 0,
        lose_time: 0,
        admin_id: '',
        updatetime: '',
        createtime: ''
      },
      tableData: [
        {
          id: '3',
          uid: '2',
          username: '13880789545',
          name: '短连接001',
          status: 1,
          short_url: 'http://i8jo.cn',
          url_addr: 'http://i8jo.cn/xQD1',
          is_delete: 0,
          total_limit: 1,
          total: 1089,
          url: 'http://www.baidu.com',
          pwd: '',
          effective_time: 0,
          period: 30,
          lose_time: 0,
          admin_id: '1',
          updatetime: '2021-11-04 01:53:03',
          createtime: '2021-11-01 14:53:03'
        },
        {
          id: '4',
          uid: '2',
          username: '13880789545',
          name: '短连接002',
          status: 1,
          short_url: 'http://s0o2.cn',
          url_addr: 'http://s0o2.cn/xQD22',
          is_delete: 0,
          total_limit: '99',
          total: 1089,
          url: 'http://www.baidu.com',
          pwd: '',
          effective_time: 0,
          period: 0,
          lose_time: 0,
          admin_id: 1,
          updatetime: '2021-11-04 01:53:03',
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
