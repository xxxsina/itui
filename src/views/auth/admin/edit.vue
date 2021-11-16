<template>
    <div class="edit-form">
        <el-form :model="result" :rules="rules" ref="thisForm" :label-width="this.G.getFormWidthSize()">
            <el-form-item label="" prop="id" style="margin:0;">
                <input type="hidden" :value="result.id" />
            </el-form-item>
            <el-form-item label="权限组" prop="group_id">
              <el-select v-model="result.group_id" placeholder="请选择权限组">
              <el-option
                v-for="item in groups"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
            </el-form-item>
            <el-form-item label="账号" prop="username">
                <el-input v-model="result.username" clearable placeholder="账号为手机号"></el-input>
            </el-form-item>
            <el-form-item label="昵称" prop="nickname">
                <el-input v-model="result.nickname" clearable placeholder="昵称"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input type="password" v-model="result.password" placeholder="密码为6至15个字符之间" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="repassword">
              <el-input type="password" v-model="result.repassword" placeholder ="密码为6至15个字符之间" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="状态" prop="status">
                <el-radio-group v-model="result.status">
                    <el-radio :label="1">正常</el-radio>
                    <el-radio :label="2">禁止</el-radio>
                </el-radio-group>
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
  mounted () {
    this.getAuthGroup().then((res) => {
      this.groups = res.data
    })
    // console.log(this.result)
  },
  inject: ['reload'],
  methods: {
    ...mapActions([
      'getAuthGroup',
      'editAdmin'
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
          this.editAdmin(this.result).then((res) => {
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
      // icon data default
      iconToolDataDefault: {
        icon: this.icon,
        visible: false
      },
      groups: [],
      // 表单验证规则
      rules: {
        group_id: [
          { required: true, message: '请选择权限组', trigger: 'change' }
        ],
        username: {
          required: true,
          validator: (rule, value, callback) => {
            if (!value) {
              return callback(new Error('请填写账号'))
            }

            if (value !== 'admin' && !/^[1][3,4,5,7,8,9][0-9]{9}$/.test(value)) {
              // 如果callback(new Error('错误要提示的信息'))代表验证不通过
              return callback(new Error('请填写正确的手机号码'))
            }
            // 如果callback()代表验证通过
            return callback()
          },
          trigger: 'change'
        },
        nickname: [
          { max: 15, message: '昵称不能超过15个字符', trigger: 'change' }
        ],
        password: [
          // { required: true, message: '请输入密码', trigger: 'change' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'change' }
        ],
        repassword: [
          {
            validator: (rule, value, callback) => {
              if (this.result.password !== value) {
                return callback(new Error('两次密码不一样'))
              }
              // 如果callback()代表验证通过
              return callback()
            },
            trigger: 'change'
          }
        ],
        status: [
          { required: true, message: '请选择状态', trigger: 'change' }
        ]
      }
    }
  }
}
</script>
