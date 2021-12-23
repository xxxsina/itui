<template>
    <div class="edit-form">
        <el-form :model="result" :rules="rulesForm" ref="thisForm" :label-width="this.G.getFormWidthSize()">
            <el-form-item label="" prop="id" style="margin:0;">
                <input type="hidden" :value="result.id" />
            </el-form-item>
            <el-form-item label="账号" prop="username">
                <el-input v-model="result.username" placeholder="用户账号"></el-input>
            </el-form-item>
            <el-form-item label="活码名称" prop="name">
                <el-input v-model="result.name" clearable placeholder="名称不能超过15个字符"></el-input>
            </el-form-item>
            <el-form-item label="展示方式" prop="smod">
              <el-radio-group v-model="result.smod">
                    <el-radio :label="1">随机切换</el-radio>
                    <el-radio :label="2">轮询切换</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="短域名" prop="short_url">
                <el-radio-group v-model="result.short_url">
                    <el-radio
                     v-for="(val, k) in shortUrls"
                     :label="val.host"
                     :key="k">
                    {{ val.host }}
                    </el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="状态" prop="status">
                <el-radio-group v-model="result.status">
                    <el-radio :label="1">正常</el-radio>
                    <el-radio :label="0">禁止</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item v-if="result.type==3" label="跳转地址" prop="total">
                <el-input v-model="result.extend" placeholder="跳转地址，如：http://..."></el-input>
            </el-form-item>
            <el-form-item label="访问量" prop="total">
                <el-input-number class="cls-input-number" v-model="result.total" :min="0" :max="1000000000" placeholder="可以不填写"></el-input-number>
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
import { mapActions } from 'vuex'

export default {
  name: 'edit-form',
  props: ['data', 'result'],
  inject: ['reload'],
  mounted () {
    this.getShortHostsConfig().then((res) => {
      this.shortUrls = res.data
    })
  },
  methods: {
    ...mapActions([
      'getShortHostsConfig',
      'editJump'
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
          this.editJump(this.result).then((res) => {
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
      disabled: true,
      shortUrls: {},
      // 表单验证规则
      rulesForm: {
        username: {
          required: true,
          validator: (rule, value, callback) => {
            if (!value) {
              return callback(new Error('请填写账号'))
            }

            if (!/^1[3-9]\d{9}$/.test(value)) {
              // 如果callback(new Error('错误要提示的信息'))代表验证不通过
              return callback(new Error('请填写正确的手机号码'))
            }
            // 如果callback()代表验证通过
            return callback()
          },
          trigger: 'change'
        },
        name: [
          { required: true, message: '请填写活码名称', trigger: 'change' },
          { max: 150, message: '名称不能超过15个字符', trigger: 'change' }
        ],
        status: [
          { required: true, message: '请选择状态', trigger: 'change' }
        ],
        smod: [
          { required: true, message: '请选择展示方式', trigger: 'change' }
        ],
        short_url: [
          { required: true, message: '请选择短域名', trigger: 'change' }
        ],
        remark: { max: 300, message: '名称不能超过60个字符', trigger: 'change' }
      }
    }
  }
}
</script>
