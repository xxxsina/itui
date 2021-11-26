<template>
    <div class="edit-form">
        <el-form :model="result" :rules="rulesForm" ref="thisForm" :label-width="this.G.getFormWidthSize()">
            <el-form-item label="" prop="id" style="margin:0;">
                <input type="hidden" :value="result.id" />
            </el-form-item>
            <el-form-item label="角色名称" prop="name">
                <el-input v-model="result.name" clearable placeholder="角色名称"></el-input>
            </el-form-item>
            <el-form-item label="状态" prop="status">
                <el-radio-group v-model="result.status">
                    <el-radio :label="1">正常</el-radio>
                    <el-radio :label="0">隐藏</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="权限" prop="rules" class="tree-scroll">
                <el-tree
                ref="rulesTree"
                :data="menuBar"
                show-checkbox
                node-key="id"
                :default-expand-all="true"
                :default-checked-keys="rules"
                :props="defaultProps">
                </el-tree>
            </el-form-item>
        </el-form>

        <div slot="footer" class="form-footer">
            <el-button type="primary" @click="submitForm('thisForm')">立即提交</el-button>
            <el-button @click="data.visible = false">取 消</el-button>
        </div>
    </div>
</template>

<style scoped>
.el-tree {
    border: 1px solid #DCDFE6;
    border-radius: 2px;
}
.el-form-item >>> .el-tree {
    overflow: auto;
    max-height: 400px;
}
</style>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'edit-form',
  props: ['data', 'result'],
  created () {
  },
  computed: {
    // eslint-disable-next-line no-undef
    ...mapGetters([
      'menuBar'
    ])
  },
  inject: ['reload'],
  mounted () {
  },
  methods: {
    ...mapActions([
      'editAuthGroup'
    ]),
    // 重置表单数据
    reset () {
      this.$refs.thisForm.resetFields()
    },
    // 创建完form后，重置参数
    setData (row) {
      this.$nextTick(() => {
        // 清除表单上的验证
        this.$refs.thisForm.clearValidate()
      })
      // 重试挨个赋值，这种方式就可以不绑定父组件了
      if (row) {
        for (let key in this.result) {
          this.result[key] = row[key]
        }
        // console.log()
        this.$nextTick(() => {
          if (this.$refs.rulesTree) {
            this.$refs.rulesTree.setCheckedKeys([])
            // console.log(this.result.rules)
            this.result.rules.forEach(value => {
              this.$refs.rulesTree.setChecked(value, true, false)
            })
          }
        })
      } else if (row === false && this.result.id !== 'add') {
        // 修改数据之后立即使用这个方法，获取更新后的 DOM
        this.$nextTick(() => {
          // 清除表单上的验证
          this.$refs.thisForm.clearValidate()
        })
        for (let key in this.result) {
          this.result[key] = ''
        }
        this.result.id = 'add'
      }
      return this.result
    },
    fresh () {
      this.reload() // 局部刷新
    },
    // form提交方法
    submitForm (formName) {
      this.$refs[formName]
        .validate()
        .then(res => {
          // 提交接口
          this.editAuthGroup(this.result).then((res) => {
            this.$message.success(res.msg)
            this.fresh() // 局部刷新
          }).catch(() => {
            this.fresh()
          })
        })
    }
  },
  data () {
    return {
      // 默认选择项目 数组 [7, 8, 9]
      rules: [],
      // 改变默认的tree数据名字的绑定
      defaultProps: {
        id: 'id',
        label: 'name',
        children: 'childs'
      },
      // 表单验证规则
      rulesForm: {
        name: [
          { required: true, message: '请选择标题', trigger: 'change' },
          { min: 1, max: 15, message: '长度在 1 到 15 个字符', trigger: 'blur' }
        ],
        status: [
          { required: true, type: 'number', enum: [1, 2], message: '请选择状态', trigger: 'change' }
        ],
        rules: {
          validator: (rule, value, callback) => {
            // 选中的的一列总存在最末端未选中的父级所有key
            let halfKeys = this.$refs.rulesTree.getHalfCheckedKeys()
            // 选中的最末端key和全部一列选中的所有key
            let selKeys = this.$refs.rulesTree.getCheckedKeys()
            // 提交的keys
            let _rules = []
            _rules = _rules.concat(halfKeys, selKeys)
            if (_rules.length <= 0) {
              return callback(new Error('请选择权限'))
            }
            this.result.rules = _rules
            // 如果callback()代表验证通过
            return callback()
          },
          trigger: 'change'
        }
      }
    }
  }
}
</script>
