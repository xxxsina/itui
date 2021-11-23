<template>
    <div class="edit-form">
        <el-form :model="result" :rules="rulesForm" ref="thisForm" :label-width="this.G.getFormWidthSize()">
            <el-form-item label="" prop="id" style="margin:0;">
                <input type="hidden" :value="result.id" />
            </el-form-item>
            <el-form-item label="VIP名称" prop="name">
                <el-input v-model="result.name" clearable placeholder="VIP名称"></el-input>
            </el-form-item>
            <el-form-item label="原价" prop="cost_price">
                <el-input v-model="result.cost_price" clearable placeholder="原价:可以不填写"></el-input>
            </el-form-item>
            <el-form-item label="现价格" prop="price">
                <el-input v-model="result.price" clearable placeholder="现价格"></el-input>
            </el-form-item>
            <el-form-item label="月数" prop="period">
                <el-input v-model="result.period" clearable placeholder="月数:填写整数"></el-input>
            </el-form-item>
            <el-form-item label="显示顺序(升序)" prop="is_sort">
              <el-input v-model="result.is_sort" placeholder="显示顺序:数字越小显示在前排"></el-input>
            </el-form-item>
            <el-form-item label="是否显示购买" prop="is_show">
              <el-radio-group v-model="result.is_show">
                    <el-radio :label="1">是</el-radio>
                    <el-radio :label="0">否</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="状态" prop="status">
                <el-radio-group v-model="result.status">
                    <el-radio :label="1">正常</el-radio>
                    <el-radio :label="2">禁止</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="规则" prop="rules_farmat">
                <el-input type="textarea" v-model="result.rules_farmat" rows="10"></el-input>
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
      'editAuthVip'
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
          try {
            this.result.rules = JSON.parse(this.result.rules_farmat)
          } catch (err) {
            this.$message.error('规则数据不合法[JSON]')
            return false
          }
          delete this.result.rules_farmat
          // 提交接口
          this.editAuthVip(this.result).then((res) => {
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
        name: [
          { required: true, message: '请填写名称', trigger: 'change' },
          { max: 15, message: '名称不能超过15个字符', trigger: 'change' }
        ],
        status: [
          { required: true, message: '请选择状态', trigger: 'change' }
        ],
        price: [
          { required: true, message: '请填写现价格', trigger: 'change' }
        ],
        period: [
          { required: true, message: '请填写月数', trigger: 'change' }
        ],
        rules_farmat: [
          { required: true, message: '请填写规则', trigger: 'change' }
        ]
      }
    }
  }
}
</script>
