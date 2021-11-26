<template>
  <div class="app-system-profile">
    <el-container class="cls-container cls-container-op">
      <el-form v-loading="loading" :model="result" :rules="rulesForm" ref="thisForm" :label-width="this.G.getFormWidthSize()" :class="{'cls-form-pc': !isMobileView, 'cls-form-mobile': isMobileView}">
        <el-form-item label="" prop="id" style="margin:0;">
            <input type="hidden" :value="result.id" />
        </el-form-item>
        <el-form-item label="账号" prop="username">
            <el-input v-model="result.username" disabled placeholder="账号为手机号"></el-input>
        </el-form-item>
        <el-form-item label="角色">
            {{ result.group_name }}
        </el-form-item>
        <el-form-item label="昵称" prop="nickname">
            <el-input v-model="result.nickname" clearable placeholder="昵称"></el-input>
        </el-form-item>
        <el-form-item label="头像" prop="avatar">
            <el-col :sm="4">
                <el-upload
                class="avatar-uploader"
                name="image"
                list-type="picture-card"
                :data="params"
                :action="uploadLink"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-col>
            <el-col :sm="4" class="cls-remove" v-if="imageUrl">
                <el-button icon="el-icon-delete" circle @click="handleRemove"></el-button>
            </el-col>
        </el-form-item>
        <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="result.password" placeholder="密码为6至15个字符之间" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="repassword">
            <el-input type="password" v-model="result.repassword" placeholder ="密码为6至15个字符之间" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="">
            <el-button type="primary" @click="submitForm('thisForm')">立即提交</el-button>
        </el-form-item>
    </el-form>
    </el-container>
  </div>
</template>

<style scoped>
.cls-form-pc, .cls-form-mobile {
    width: 100%;
}
.cls-form-pc >>> .el-input__inner {
    width: 30%;
}
.cls-form-mobile >>> .el-input__inner {
    width: 100%;
}
.avatar-uploader >>> .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    display: block;
    text-align: center;
}
.avatar-uploader >>> .el-upload:hover {
    border-color: #409EFF;
}
.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    text-align: center;
}
.avatar {
    width: 148px;
    height: 148px;
    display: block;
}
.cls-remove {
  margin-top: 110px;
  margin-left: 110px;
  position: absolute;
  opacity: 0.6;
}
.cls-remove button {
  border: 1px #c0c4cc dashed;
}
</style>

<script>
import baseUrl from '@/api/baseUrl'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'app-system-profile',
  // 局部刷新
  inject: ['reload'],
  mounted () {
    // 绑定数据
    this.profile()
  },
  computed: {
    ...mapGetters([
      'adminInfo'
    ])
  },
  methods: {
    ...mapActions([
      'getAdminProfile',
      'setAdminProfile'
    ]),
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
    // 上传图片成功回调
    handleAvatarSuccess (res, file) {
      if (res.code === 200) {
        this.result.avatar = res.data.filePath
        this.result.image_id = res.data.id
        this.imageUrl = URL.createObjectURL(file.raw)
      } else {
        this.$message.error(res.msg)
      }
    },
    // 移除图片
    handleRemove () {
      this.result.avatar = ''
      this.imageUrl = ''
    },
    // form提交方法
    submitForm (formName) {
      this.$refs[formName]
        .validate()
        .then(res => {
          this.loading = true
          this.setAdminProfile(this.result).then((res) => {
            this.$message.success(res.msg)
            if (res.code === 200) {
              location.reload()
            }
            // this.loading = false
          }).catch(() => {
            this.reload() // 局部刷新
          })
        })
    },
    // 请求管理员数据
    profile () {
      this.loading = true
      this.getAdminProfile().then((res) => {
        this.result = res.data
        this.result.image_id = 0
        this.imageUrl = res.data.avatar ? this.G.imgHost + res.data.avatar : ''
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    }
  },
  data () {
    return {
      loading: false,
      isMobileView: this.G.isMobileInterView(),
      uploadLink: baseUrl + '/file/upload',
      imageUrl: '',
      params: {
        type: 'admin'
      },
      result: {},
      // 表单验证规则
      rulesForm: {
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
        ]
      }
    }
  }
}
</script>
