<template>
    <div class="edit-form">
        <el-form :model="result" :rules="rules" ref="thisForm" :label-width="this.G.getFormWidthSize()">
            <el-form-item label="" prop="id" style="margin:0;">
                <input type="hidden" :value="result.id" />
            </el-form-item>
            <el-form-item label="账号" prop="username">
                <el-input v-model="result.username" clearable placeholder="请填写手机号"></el-input>
            </el-form-item>
            <el-form-item label="昵称" prop="nickname">
                <el-input v-model="result.nickname" clearable placeholder="昵称"></el-input>
            </el-form-item>
            <el-form-item label="头像" prop="avatar">
                <el-upload
                class="avatar-uploader"
                action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                    <img v-if="result.avatar" :src="result.avatar" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input type="password" v-model="result.password" placeholder="密码为6至15个字符之间" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="rePassword">
              <el-input type="password" v-model="result.rePassword" placeholder ="密码为6至15个字符之间" autocomplete="off"></el-input>
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
.avatar-uploader >>> .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader >>> .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 60px;
    height: 60px;
    line-height: 60px;
    text-align: center;
  }
  .avatar {
    width: 60px;
    height: 60px;
    display: block;
  }
</style>

<script>

export default {
  name: 'edit-form',
  props: ['data', 'result', 'formWidthSize'],
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
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isPNG = file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG && !isPNG) {
        this.$message.error('上传头像图片只能是 JPG 或者 PNG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }

      return (isPNG || isJPG) && isLt2M
    },
    handleAvatarSuccess (res, file) {
      console.log(file)
      this.imageUrl = URL.createObjectURL(file.raw)
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
          console.log(err)
          console.log('error submit!!')
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
      imageUrl: '',
      // 表单验证规则
      rules: {
        username: {
          required: true,
          validator: (rule, value, callback) => {
            if (!value) {
              return callback(new Error('请填写账号'))
            }

            if (!/^[1][3,4,5,7,8,9][0-9]{9}$/.test(value)) {
              // 如果callback(new Error('错误要提示的信息'))代表验证不通过
              return callback(new Error('请填写正确的手机号码'))
            }
            // 如果callback()代表验证通过
            return callback()
          },
          trigger: 'change'
        },
        password: {
          validator: (rule, value, callback) => {
            if (typeof value !== 'undefined') {
              if (value.length < 6 || value.length > 15) {
                return callback(new Error('密码为6至15个字符之间'))
              }
            } else if (typeof value === 'undefined' && typeof this.result.rePassword !== 'undefined') {
              return callback(new Error('两次密码不一致'))
            }

            // 如果callback()代表验证通过
            return callback()
          },
          trigger: 'change'
        },
        rePassword: {
          validator: (rule, value, callback) => {
            if (typeof value !== 'undefined') {
              if (value.length < 6 || value.length > 15) {
                return callback(new Error('密码为6至15个字符之间'))
              }

              if (this.result.password !== value) {
                return callback(new Error('两次密码不一致'))
              }
            } else if (typeof value === 'undefined' && typeof this.result.password !== 'undefined') {
              return callback(new Error('两次密码不一致'))
            }

            // 如果callback()代表验证通过
            return callback()
          },
          trigger: 'blur'
        },
        nickname: [
          { max: 15, message: '昵称不能超过15个字符', trigger: 'change' }
        ],
        status: [
          { required: true, message: '请选择状态', trigger: 'change' }
        ]
      }
    }
  }
}
</script>
