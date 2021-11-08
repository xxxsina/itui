<template>
    <div class="edit-form">
        <el-form :model="result" :rules="rulesForm" ref="thisForm" :label-width="this.G.getFormWidthSize()">
            <el-form-item label="" prop="id" style="margin:0;">
                <input type="hidden" :value="result.id" />
            </el-form-item>
            <el-form-item label="渠道连接" prop="url">
                <el-input v-model="result.url" clearable></el-input>
            </el-form-item>
            <el-form-item label="状态" prop="status">
                <el-radio-group v-model="result.status">
                    <el-radio :label="1">正常</el-radio>
                    <el-radio :label="2">禁止</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="访问上限" prop="total_limit">
                <el-input-number class="cls-input-number" v-model="result.total_limit" :min="0" :max="1000000000" placeholder="可以不填写"></el-input-number>
            </el-form-item>
            <el-form-item label="访问总量" prop="total">
                <el-input-number class="cls-input-number" disabled v-model="result.total" :min="0" :max="1000000000" placeholder="可以不填写"></el-input-number>
            </el-form-item>
            <el-form-item label="备注" prop="remark">
                <el-input type="textarea" :rows="3" v-model="result.remark" clearable placeholder="可以不填写"></el-input>
            </el-form-item>
        </el-form>

        <div slot="footer" class="form-footer">
            <el-button type="primary" @click="submitForm('thisForm')">立即提交</el-button>
            <el-button @click="data.visible = false">取 消</el-button>
        </div>
    </div>
</template>

<style scoped>
.cls-input-number {
    width: unset;
}
</style>

<script>

export default {
  name: 'edit-form',
  props: ['data', 'result'],
  inject: ['reload'],
  methods: {
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
        for (let key in row) {
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
          console.log(this.result)
          this.fresh()
        })
        // eslint-disable-next-line handle-callback-err
        .catch(err => {
          if (err.message) {
            this.$message.error(err.message)
          }
          console.log(err)
          console.log('error submit!!')
        })
    }
  },
  data () {
    return {
      // 表单验证规则
      rulesForm: {
        url: [
          { required: true, message: '请填写渠道连接', trigger: 'change' }
        ],
        status: [
          { required: true, message: '请选择状态', trigger: 'change' }
        ],
        remark: { max: 60, message: '备注不能超过60个字符', trigger: 'change' }
      }
    }
  }
}
</script>
