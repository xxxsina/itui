<template>
    <div class="edit-form">
        <el-form :model="result" :rules="rulesForm" ref="thisForm" :label-width="this.G.getFormWidthSize()">
            <el-form-item label="" prop="id" style="margin:0;">
                <input type="hidden" :value="result.id" />
            </el-form-item>
            <el-form-item label="短域名title" prop="title">
                <el-input v-model="result.title" placeholder="为不带http的部分,如:domain.cn"></el-input>
            </el-form-item>
            <el-form-item label="短域名http[s]" prop="host">
                <el-input v-model="result.host" placeholder="为带http[s]的部分,如:http[s]://domain.cn"></el-input>
            </el-form-item>
            <el-form-item label="状态" prop="status">
                <el-radio-group v-model="result.status">
                    <el-radio :label="1">正常</el-radio>
                    <el-radio :label="0">隐藏</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="是否标记HOT" prop="hot">
                <el-radio-group v-model="result.hot">
                    <el-radio :label="1">是</el-radio>
                    <el-radio :label="0">否</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="排序[升序]" prop="is_sort">
                <el-input v-model="result.is_sort" placeholder="数字越小越靠前"></el-input>
            </el-form-item>
        </el-form>

        <div slot="footer" class="form-footer">
            <el-button type="primary" @click="submitForm('thisForm')">立即提交</el-button>
            <el-button @click="data.visible = false">取 消</el-button>
        </div>
    </div>
</template>

<style scoped>
</style>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'edit-form',
  props: ['data', 'result'],
  inject: ['reload'],
  methods: {
    ...mapActions([
      'editHosts'
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
          this.editHosts(this.result).then((res) => {
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
      // 表单验证规则
      rulesForm: {
        title: [
          { required: true, message: '请填写域名title', trigger: 'change' }
        ],
        host: [
          { required: true, message: '请填写短域名', trigger: 'change' }
        ],
        status: [
          { required: true, message: '请选择状态', trigger: 'change' }
        ],
        is_sort: [
          {
            validator: (rule, value, callback) => {
              if (!value) {
                return callback()
              }
              // is Not a Number
              if (isNaN(value)) {
                return callback(new Error('请输入数字'))
              }
              if (!/^[1-9]+[0-9]*]*$/.test(value)) {
                return callback(new Error('请输入正整数'))
              }
              // 如果callback()代表验证通过
              return callback()
            },
            trigger: 'change'
          }
        ]
      }
    }
  }
}
</script>
