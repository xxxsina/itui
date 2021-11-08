<template>
    <div class="app-form-list">
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
                        <el-input v-model="search.content" clearable placeholder="姓名或者手机号"></el-input>
                    </el-form-item>
                    <el-form-item label="" prop="form_id" style="margin:0;">
                        <input type="hidden" :value="search.form_id" />
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
            style="width: 100%">
            <el-table-column
            align="center"
            prop="id"
            label="ID"
            width="80">
            </el-table-column>
            <el-table-column
            align="center"
            prop="realname"
            label="姓名"
            width="200">
            </el-table-column>
            <el-table-column
            align="center"
            prop="phone"
            label="手机号"
            width="200">
            </el-table-column>
            <el-table-column
            align="center"
            prop="url"
            label="图片"
            width="360">
              <template slot-scope="scope">
                <el-image
                v-if="scope.row.image"
                  style="width: 100px; height: 100px"
                  :src="scope.row.image"
                  fit="contain">
                </el-image>
              </template>
            </el-table-column>
            <el-table-column
            align="center"
            prop="createtime"
            label="创建时间"
            width="140">
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
    </div>
</template>

<style scoped>
.cls-tb-url-input >>> input {
  height: 26px;
  line-height: 26px;
}
.cls-btn-return >>> span {
  margin-left: unset;
}
</style>

<script>
import edit from '@/views/sheet/form/edit'

export default {
  name: 'app-form-list',
  components: {
    'el-lee-edit': edit
  },
  created () {
    console.log(this.$route.params.parent_id)
    // console.log(this.$route.query)
  },
  methods: {
    cancel () {
      this.$refs.thisForm.reset()
    },
    // 返回上一页
    returnPage () {
      if (window.history.length <= 1) {
        this.$router.push({ path: 'qrcode' })
        return false
      } else {
        this.$router.go(-1)
      }
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
      this.submitSearchForm('searchForm')
    }
  },
  data () {
    return {
      currentPage: 2,
      drawer: false,
      dialogToolDataDefault: {
        title: '添加',
        visible: false
      },
      search: {
        form_id: this.$route.params.parent_id,
        datetime: '', // ['2021-11-01 23:59:59', '2021-11-03 00:00:01'],
        content: ''
      },
      result: {
        id: '',
        uid: '',
        form_id: '',
        realname: '',
        phone: 0,
        image: '',
        is_delete: '',
        admin_id: '',
        updatetime: '',
        createtime: ''
      },
      tableData: [
        {
          id: '1',
          uid: '2',
          form_id: '1',
          realname: '王五',
          phone: '13980789555',
          image: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
          is_delete: 0,
          admin_id: '1',
          updatetime: '2021-11-04 01:53:03',
          createtime: '2021-11-01 14:53:03'
        },
        {
          id: '2',
          uid: '2',
          form_id: '1',
          realname: '赵四',
          phone: '13980780000',
          image: 'https://www.runoob.com/try/demo_source/paris.jpg',
          is_delete: 0,
          admin_id: '1',
          updatetime: '2021-11-04 01:53:03',
          createtime: '2021-11-01 14:53:03'
        }
      ],
      rulesSearch: {
        content: [
          { min: 1, max: 15, message: '长度在 1 到 15 个字符', trigger: 'change' },
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
