<template>
  <div class="app-system-attachment">
    <el-container class="cls-container cls-container-op">
        <el-col style="white-space: nowrap;">
          <el-form :model="search" :rules="rulesSearch" ref="searchForm" :inline="!this.G.isMobileInterView()">
            <el-button type="success" @click="reload" style="padding: 9px 12px;" title="刷新">
              <i class="el-icon-refresh"></i>
            </el-button>
            <el-form-item label="" prop="isBusiness">
                <el-select v-model="search.isBusiness" placeholder="是否绑定业务">
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item prop="content">
                <el-input v-model="search.content" clearable placeholder="用户账号"></el-input>
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
          prop="username"
          label="用户账号"
          width="120">
        </el-table-column>
        <el-table-column
          align="center"
          prop="url"
          label="图片"
          width="80">
          <template slot-scope="scope">
              <el-image
                class="cls-att-img"
                v-if="scope.row.url"
                @click="handleDoc(scope.$index, scope.row)"
                :src="G.imgHost + scope.row.url"
                fit="contain">
              </el-image>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="imagewidth"
          label="宽"
          width="60">
        </el-table-column>
        <el-table-column
          align="center"
          prop="imageheight"
          label="高"
          width="60">
        </el-table-column>
        <el-table-column
          align="center"
          prop="imagetype"
          label="类型"
          width="60">
        </el-table-column>
        <el-table-column
          align="center"
          prop="mimetype"
          label="mimetype"
          width="100">
        </el-table-column>
        <el-table-column
          align="center"
          prop="filesize"
          label="大小[字节]"
          width="120">
        </el-table-column>
        <el-table-column
          align="center"
          prop="ticket_id"
          label="是否绑定业务"
          width="100">
          <template slot-scope="scope">
              <el-tag size="small" type="success" v-if="scope.row.ticket_id!=0">是</el-tag>
              <el-tag size="small" type="danger" v-else>否</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="ticket_type"
          label="业务类型"
          width="100">
        </el-table-column>
        <el-table-column
          align="center"
          prop="admin"
          label="管理员"
          width="120">
        </el-table-column>
        <el-table-column
          align="center"
          prop="updatetime"
          label="修改时间"
          width="160">
        </el-table-column>
        <el-table-column
          align="center"
          prop="createtime"
          label="创建时间"
          width="160">
        </el-table-column>
        <el-table-column
          align="center"
          prop="op"
          label="操作">
          <template slot-scope="scope">
              <el-button
                title="详情"
                type='success'
                size="mini"
                icon="el-icon-document"
                @click="handleDoc(scope.$index, scope.row)">
              </el-button>
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
    <!-- 详情：抽屉方式 -->
    <el-lee-detail ref="codesDetail" :result="row" :drawer="drawer"></el-lee-detail>
  </div>
</template>

<style scoped>
.cls-att-img {
  cursor: pointer;
}
</style>

<script>
import { mapActions } from 'vuex'
import detail from '@/views/system/attach/detail'

export default {
  name: 'app-system-attachment',
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
      'getAttachmentList',
      'delAttachment'
    ]),
    // 抽屉显示详情
    handleDoc (index, column) {
      this.$refs.codesDetail.showDraw()
      column.extparam = JSON.stringify(JSON.parse(column.extparam), null, 2)
      this.row = column
    },
    // 删除事件
    handleDelete (index, column) {
      this.delAttachment({
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
        this.delAttachment({
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
          this.getAttachmentList({
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
      console.log(page)
      this.getList()
    },
    // 请求数据统一调用方法
    getList () {
      this.loading = true
      this.getAttachmentList({
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
      drawer: false,
      row: {},
      search: {
        isBusiness: '',
        content: ''
      },
      data: {
        page: 1,
        limit: 1,
        total: 0,
        list: []
      },
      options: [{
        value: 1,
        label: '是'
      }, {
        value: 0,
        label: '否'
      }],
      rulesSearch: {
        content: [
          { min: 1, max: 15, message: '长度在 1 到 15 个字符', trigger: 'blur' },
          {
            validator: (rule, value, callback) => {
              if (!value && this.search.isBusiness === '') {
                return callback(new Error('请填写账号'))
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
