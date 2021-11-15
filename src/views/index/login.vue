<template>
  <div class="app-login">
    <el-container>
      <el-header>
        <span>企业管理系统</span>
      </el-header>
      <el-main>
        <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>登录</span>
        </div>
        <el-form :model="result" :rules="rulesForm" ref="thisForm">
            <el-form-item label="" prop="username">
                <el-input
                  prefix-icon="el-icon-user"
                  v-model="result.username"
                  placeholder="请输入手机号"
                  auto-complete="off">
                </el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                prefix-icon="el-icon-unlock"
                :type="passwordVisible"
                v-model="result.password"
                placeholder="请输入密码"
                auto-complete="new-password">
                <i slot="suffix" :class="icon" @click="showPass"></i>
              </el-input>
            </el-form-item>
            <el-form-item prop="captcha">
              <el-input
                prefix-icon="el-icon-mobile-phone"
                type="text"
                placeholder="点击图片更换验证码"
                v-model="result.captcha"
                class="vertify_code"
                maxlength="4"
                @keyup.enter.native="submitForm('thisForm')"
                auto-complete="false">
              </el-input>
                <!-- 后端提供验证码图片方式 -->
                <!-- <span class="code">验证码</span> -->
                <img :src="imgUrl" @click="resetImg" class="vertify_img" />

                <!-- 验证码组件 前端生成图片方式，后端提供数字 -->
                <!-- <div class="login-code" @click="refreshCode">
                <s-identify :identifyCode="identifyCode"></s-identify>
                </div> -->
            </el-form-item>
            <el-form-item prop="checked">
              <el-checkbox v-model="result.checked" class="remeber_me">记住我</el-checkbox>
            </el-form-item>
            <div style="text-align: center;">
              <el-button type="primary" @click="submitForm('thisForm')">登 录</el-button>
              <el-button @click="resetForm('thisForm')">重 置</el-button>
            </div>
        </el-form>
      </el-card>
      </el-main>
    </el-container>

  </div>
</template>

<script>
// import { mixin } from "../mixins/index";
// import { getLoginStatus } from "../api/index";
// import SIdentify from '@/components/captcha'
import baseUrl from '@/api/baseUrl'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'app-login',
  // components: { SIdentify },
  data: function () {
    return {
      identifyCode: '3528',
      passwordVisible: 'password',
      icon: 'lee-icon-biyan',
      imgUrl: baseUrl + '/verify?' + new Date().getTime(),
      result: {
        checked: false,
        username: '',
        password: '',
        captcha: ''
      },
      rulesForm: {
        username: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          {
            validator: (rule, value, callback) => {
              if (value !== 'admin' && !/^[1][3,4,5,7,8,9][0-9]{9}$/.test(value)) {
              // 如果callback(new Error('错误要提示的信息'))代表验证不通过
                return callback(new Error('请填写正确的手机号码'))
              }
              // 如果callback()代表验证通过
              return callback()
            },
            trigger: 'change'
          }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 15, message: '密码长度在 6 到 15 个字符之间', trigger: 'blur' }
        ],
        captcha: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { len: 4, message: '请输入正在的验证码', trigger: 'change' }
        ]
      }
    }
  },
  created () {
    // 监听是否登录，如果已经登录就
    if (this.token) {
      if (this.$route.query.redirect) {
        this.$router.push(this.$route.query.redirect)
      } else {
        this.$router.push('/')
      }
    }
  },
  computed: {
    ...mapGetters([
      'token',
      'admin'
    ])
  },
  mounted () {
    this.account() // 获取cookie的方法
    // console.log('redirect => ', this.$route.query.redirect)
    // console.log('admin ===== ')
    // console.log(this.token)
    // console.log('admin ===== end')
  },
  methods: {
    ...mapActions([
      'loginByUsername'
    ]),
    account () {
      let _memberMe = this.$cookie.get('memberMe')
      if (_memberMe) {
        let _j = JSON.parse(_memberMe)
        this.result.username = _j.u
        this.result.password = _j.p
        this.result.checked = _j.c
      }
    },
    clearCookie () {
      this.$cookie.delete('memberMe') // 清除cookie
    },
    // 方法
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 取参数
          if (this.result.checked === true) {
            // 存入cookie 保存7天
            let memberMe = {
              u: this.result.username,
              p: this.result.password,
              c: true
            }
            this.$cookie.set('memberMe', JSON.stringify(memberMe), 1)
          } else {
            this.clearCookie()
          }
          // 调用方法提交
          this.loginByUsername(this.result).then((res) => {
            if (res) {
              this.$message.success(res.msg)
              if (res.code == 200) {
                if (this.$route.query.redirect) {
                  this.$router.push(this.$route.query.redirect)
                } else {
                  this.$router.push('/')
                }
              }
            }
          }).catch(error => {
            if (!error.code) {
              this.resetImg()
            }
          })
        } else {
          return false
        }
      })
    },
    // 点击图片更换验证码
    resetImg () {
      this.imgUrl = baseUrl + '/verify?' + new Date().getTime()
    },
    // 这里是验证码第二种方法要用的函数，和 refreshCode() 一起
    randomNum (min, max) {
      return Math.floor(Math.random() * (max - min) + min)
    },
    refreshCode () {
      this.identifyCode = "'" + this.randomNum(1000, 10000) + "'"
    },
    // 重置
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    // 显示或者不显密码
    showPass () {
      if (this.passwordVisible !== 'text') {
        this.passwordVisible = 'text'
        // 更换图标 view
        this.icon = 'el-icon-view'
      } else {
        this.passwordVisible = 'password'
        this.icon = 'lee-icon-biyan'
      }
    }
  }
}
</script>

<style scoped>
.el-icon-view, .lee-icon-biyan {
  cursor: pointer;
}
.app-login {
  height: 100%;
  background-color: #f1f4f6;
}
.el-header {
  background-color: #30bc9b;
  width: 100%;
  line-height: 60px;
  padding-left: 30px;
  text-align: left;
  color: #fff;
}
.el-main {
  margin: 0 auto;
  margin-top: 60px;
}
.box-card {
  width: 330px;
  height: 330px;
  border-radius: 5px;
  opacity: 0.9;
  filter: alpha(opacity=9);
  background: #fff;
}
.vertify_code {
  width: 180px;
}
.vertify_img {
  position: absolute;
  right: 0;
  bottom: 0;
  width: 110px;
  height: 32px;
  cursor: pointer;
  border-radius: 0px 2px 2px 0px;
}
.el-input--small >>> .el-input__inner {
  border-radius: 2px;
}
.vertify_code >>> .el-input__inner {
  border-radius: 2px 0px 0px 2px;
}
</style>
