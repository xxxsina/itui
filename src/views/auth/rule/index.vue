<template>
  <div class="app-auth-rule">
    <el-container class="cls-container cls-container-op">
      <el-button type="primary" @click="showDialogTool()" style="padding: 9px 12px;">
        <i class="el-icon-plus"></i>
        添加
      </el-button>
    </el-container>
    <el-container class="cls-container cls-container-tab">
      <el-table
        :data="menus"
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
          label="标题"
          width="300">
        </el-table-column>
        <el-table-column
          align="center"
          prop="icon"
          label="图标"
          width="120">
          <template slot-scope="scope"><i :class="scope.row.icon"></i></template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="rulelink"
          label="规则"
          width="500">
        </el-table-column>
        <el-table-column
          align="center"
          prop="weight"
          label="权重"
          width="100">
        </el-table-column>
        <el-table-column
          align="center"
          prop="status"
          label="状态"
          width="100">
          <template slot-scope="scope">
            <el-col v-if="scope.row.status == 1" style="color: #67C23A">正常</el-col>
            <el-col v-else style="color: #909399">隐藏</el-col>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="ismenu"
          label="菜单"
          width="100">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.ismenu"
              :value="scope.row.ismenu"
              :active-value="1"
              :inactive-value="2"
              @change="setIsMenu({'ismenu': $event, 'id': scope.row.id})"
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
        <!-- <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage1"
          :page-size="100"
          layout="total, prev, pager, next"
          :total="999">
        </el-pagination> -->
      </el-col>
    </el-container>

    <dialogTool ref="dialogTool" :data='dialogToolDataDefault'>
      <el-lee-edit ref="thisForm" slot="slotEditForm" :result='result' :data='dialogToolDataDefault'></el-lee-edit>
    </dialogTool>

  </div>
</template>

<style scoped>
</style>

<script>
import { mapGetters, mapActions } from 'vuex'
import edit from '@/views/auth/rule/edit'

export default {
  name: 'app-auth-rule',
  components: {
    'el-lee-edit': edit
  },
  computed: {
    // eslint-disable-next-line no-undef
    ...mapGetters([
      'menuBar'
    ])
  },
  mounted () {
    this.menus = this.menuBar
  },
  methods: {
    ...mapActions([
      'setIsMenu'
    ]),
    cancel () {
      // console.log('我是爸爸')
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
      // 重试set表单的值,这里有个坑，父组件调用子组件方法要加一个延时，因为子组件还没渲染
      setTimeout(() => {
        this.$refs.thisForm.setData(column)
      })
      // 重试set表单的值，Object.assign这个是相当于重置对象里面所有项
      // Object.assign(this.result, resultNew)
    },
    // 删除事件
    handleDelete (index, column) {
      console.log(index)
      console.log(column)
    },
    // 改变菜单ismenu
    ismenuChange (ismenu, id) {
      console.log(ismenu)
      console.log(id)
      this.setIsMenu({id, ismenu})
      // console.log(this.$store.state.rule.isMenu)
    },
    // axios 示例
    // getDataText () {
    //   console.log('xxxxxxx start xxxxxxxx')
    //   let _data = {
    //     'username': '20190901006',
    //     'password': '423423',
    //     'page': this.page
    //   }
    //   let _config = {
    //     headers: {
    //       'X-Requested-With': 'XMLHttpRequest',
    //       // 'token': '416b00d0ab77e8549d4883ba59c2fcaadd0d7d74a372e59fd19475be5a97da97',
    //       'companycode': 'k9monpgAzv2zNJKZYdOy'
    //     }
    //   }
    //   // eslint-disable-next-line no-undef
    //   this.$axios.post('http://www.amcapi.sw/user/user/login', _data, _config).then(response => {
    //     console.log(response.data)
    //     if (response.data.success === true) {
    //       this.$message.success(response.data.message)
    //       // this.$message(response.data.data.username)
    //     } else {
    //       this.$message.error(response.data.message)
    //     }
    //   })
    //   console.log('xxxxxxx end xxxxxxxx')
    // },
    async getLogin () {
      let _data = {
        'username': '20190901006',
        'password': '423423',
        'page': this.page
      }
      let params = {
        type: 'npcxxxx'
      }
      console.log('xxxxxxx start xxxxxxxx')
      // eslint-disable-next-line no-undef
      // let rs = this.$cookie.set('token', '3333')
      // console.log(rs)
      try {
        let res = await this.$api.matches.login(_data, params)
        this.$message.success(res.message)
        if (res.data) {
          this.$cookie.set('token', res.data.token, { expires: '10s' })
        }
      } catch (e) {
        console.log('​catch -> e', e)
      }
      console.log('xxxxxxx end xxxxxxxx')
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
      menus: [],
      name: '',
      page: 1,
      result: {
        id: 'add',
        title: '',
        icon: '',
        rulelink: '',
        weight: '',
        ismenu: 1,
        pid: 0,
        status: 1
      },
      dialogToolDataDefault: {
        title: '添加',
        visible: false
      },
      // tableData: this.G.menu,
      tableData: []
    }
  }
}
</script>
