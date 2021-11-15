<template>
  <div class="app-auth-rule">
    <el-container class="cls-container cls-container-op">
      <el-col style="white-space: nowrap;">
        <el-button type="success" @click="reload" style="padding: 9px 12px;" title="刷新">
          <i class="el-icon-refresh"></i>
        </el-button>
        <el-button type="primary" @click="showDialogTool()" style="padding: 9px 12px;">
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
          label="标题"
          width="200">
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
          prop="rule"
          label="规则"
          width="300">
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
            <el-tag size="small" type="success" v-if="scope.row.status==1">正常</el-tag>
            <el-tag size="small" type="danger" v-else>隐藏</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="ismenu"
          label="是否菜单"
          width="100">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.ismenu"
              :value="scope.row.ismenu"
              :active-value="1"
              :inactive-value="0"
              @change="ismenuChange(scope.$index, scope.row)"
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
          prop="createtime"
          label="创建时间"
          width="140">
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

    <dialogTool ref="dialogTool" :data='dialogToolDataDefault'>
      <el-lee-edit
        ref="thisForm"
        slot="slotEditForm"
        :list='data.list'
        :result='result'
        :data='dialogToolDataDefault'>
      </el-lee-edit>
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
  inject: ['reload'],
  computed: {
    // eslint-disable-next-line no-undef
    ...mapGetters([
      'menuBar'
    ])
  },
  mounted () {
    // 绑定数据
    this.getList()
  },
  methods: {
    ...mapActions([
      'getAuthRuleList',
      'editAuthRule',
      'delAuthRule'
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
    },
    // 删除事件
    handleDelete (index, column) {
      this.delAuthRule({
        ids: column.id
      }).then((res) => {
        this.$message.success(res.msg)
        this.reload() // 局部刷新
      })
    },
    // 改变菜单ismenu
    ismenuChange (index, column) {
      this.editAuthRule({
        id: column.id,
        name: column.name,
        rule: column.rule,
        status: column.status,
        ismenu: column.ismenu
      }).then((res) => {
        this.$message.success(res.msg)
        this.reload() // 局部刷新
      })
    },
    // 请求数据统一调用方法
    getList () {
      this.getAuthRuleList().then((res) => {
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
      result: {
        id: 'add',
        pid: 0,
        status: 1,
        name: '',
        icon: '',
        rule: '',
        weight: '',
        ismenu: 1
      },
      dialogToolDataDefault: {
        title: '添加',
        visible: false
      }
    }
  }
}
</script>
