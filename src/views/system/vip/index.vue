<template>
    <div class="app-users-vip">
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
                <el-tag size="small" v-if="scope.row.status==1">是</el-tag>
                <el-tag size="small" type="danger" v-if="scope.row.status!=1">否</el-tag>
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
            prop="createtime"
            label="注册时间"
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
                :inactive-value="2"
                active-color="#13ce66">
                </el-switch>
            </template>
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
        <el-lee-detail ref="codesDetail" :result="row" :drawer="drawer"></el-lee-detail>
    </div>
</template>

<style scoped>
</style>

<script>
import detail from './detail'
import edit from './edit'

export default {
  name: 'app-users-vip',
  components: {
    'el-lee-detail': detail,
    'el-lee-edit': edit
  },
  methods: {
    errorHandler () {
      return true
    },
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
      column.rules_farmat = JSON.stringify(JSON.parse(column.rules), null, 2)
      // 显示dialog
      this.$refs.dialogTool.showDialog()
      // 重置set表单的值,这里有个坑，父组件调用子组件方法要加一个延时，因为子组件还没渲染
      setTimeout(() => {
        this.$refs.thisForm.setData(column)
      })
    },
    handleDoc (index, column) {
      column.rules_farmat = JSON.stringify(JSON.parse(column.rules), null, 2)
      this.$refs.codesDetail.showDraw()
      this.row = column
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
      drawer: false,
      drawerSize: this.G.getDrawerSize(),
      row: {},
      result: {
        id: 'add',
        admin_id: '',
        name: '',
        status: 1,
        is_show: 0,
        is_sort: '',
        price: '',
        cost_price: '',
        period: '',
        rules: '',
        rules_farmat: '',
        createtime: ''
      },
      tableData: [
        {
          id: '1',
          admin_id: '1',
          name: '一月vip',
          status: 1,
          is_show: 1,
          is_sort: 1,
          price: '10.00',
          cost_price: '20.00',
          period: 1,
          rules: '{"common":{"index":5},"jump":[{"type":1,"index":1,"add":1,"del":false},{"type":2,"add":1,"del":false},{"type":3,"add":1,"del":false}],"jumpurl":[{"type":1,"index":1,"add":1},{"type":2,"add":1},{"type":3,"add":1}],"form":{"index":2,"add":2,"del":false},"cooperation":{"index":false,"add":false,"del":false},"shorturl":{"index":1,"add":2,"del":false}}',
          createtime: '2021-11-01 14:53:03'
        },
        {
          id: '2',
          admin_id: '1',
          name: '三月vip',
          status: 1,
          is_show: 1,
          is_sort: 2,
          price: '30.00',
          cost_price: '90.00',
          period: 3,
          rules: '{"jumpurl":[{"type":1,"add":200},{"type":2,"add":200},{"type":3,"add":200}]}',
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
