<template>
  <div class="login-wrap">
    <div class="ms-title">'音酷'-后台管理系统</div>
    <div class="ms-login">
      <!-- ruleForm：数据表单；rules：提示；ref：使用这个form的名字 -->
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="form">
        <el-form-item prop="username">
          <!-- v-model：双向绑定，placeholder：不输入内容之前提示 -->
          <el-input
            prefix-icon="el-icon-user"
            v-model="ruleForm.username"
            placeholder="用户名"
            auto-complete="off"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <!-- type：密码显示* -->
          <!-- <el-input prefix-icon="el-icon-unlock" type="password" v-model="ruleForm.password" placeholder="密码" auto-complete="false"></el-input> -->
          <el-input
            prefix-icon="el-icon-unlock"
            :type="passwordVisible"
            v-model="ruleForm.password"
            placeholder="密码"
            auto-complete="new-password"
          >
            <i slot="suffix" :class="icon" @click="showPass"></i>
          </el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input
            prefix-icon="el-icon-mobile-phone"
            type="text"
            placeholder="点击图片更换验证码"
            v-model="ruleForm.code"
            class="vertify_code"
            auto-complete="false"
          ></el-input>
          <!-- <span class="code">验证码</span> -->
          <img :src="imgUrl" @click="resetImg" class="vertify_img" />
            <div class="login-code" @click="refreshCode">
            <!--验证码组件-->
            <s-identify :identifyCode="identifyCode"></s-identify>
            </div>
        </el-form-item>
        <el-checkbox v-model="checked" class="remeberMe">记住我</el-checkbox>
        <div class="login-btn">
          <el-button type="primary" @click="submitForm('ruleForm')"
            >登录</el-button
          >
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
// import { mixin } from "../mixins/index";
// import { getLoginStatus } from "../api/index";
import SIdentify from '@/components/captcha'

export default {
  components: { SIdentify },
  data: function () {
    return {
      identifyCode: '3x81',
      checked: false,
      passwordVisible: 'password',
      icon: 'el-icon-view',
      imgUrl: 'http://localhost:8888/verifyCode?time=' + new Date(),
      ruleForm: {
        username: '',
        password: '',
        code: ''
      },
      rules: {
        username: [
          // required：规则，trigger：失去焦点触发
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        code: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
      }
    }
  },
  mounted () {
    // this.account() // 获取cookie的方法
  },
  methods: {
    account () {
      console.log(this.getCookie('username'))
      this.ruleForm.username = this.getCookie('username')
      this.ruleForm.password = this.getCookie('password')
    },
    // setCookie (c_name, c_pwd, exdate) {
    //   // 账号，密码 ，过期的天数
    //   var exdate = new Date()
    //   exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdate) // 保存的天数
    //   document.cookie =
    //     'username=' + c_name + ';path=/;expires=' + exdate.toLocaleString()
    //   document.cookie =
    //     'password=' + c_pwd + ';path=/;expires=' + exdate.toLocaleString()
    // },
    getCookie (name) {
      var arr = document.cookie.split(';')
      for (var i = 0; i < arr.length; i++) {
        var arr2 = arr[i].split('=')
        if (arr2[0].trim() === name) {
          return arr2[1]
        }
      }
    },
    clearCookie () {
    //   this.setCookie('', '', -1) // 清除cookie
    },

    // 方法
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        // if (valid) {
        //   // 取参数
        //   let params = new URLSearchParams()
        //   params.append('name', this.ruleForm.username)
        //   params.append('password', this.ruleForm.password)
        //   params.append('code', this.ruleForm.code)
        //   if (this.checked == true) {
        //     // 存入cookie
        //     this.setCookie(this.ruleForm.username, this.ruleForm.password, 7) // 保存7天
        //   } else {
        //     this.clearCookie()
        //   }

        // 调用方法提交
        //   getLoginStatus(params).then((res) => {
        //     if (res.code == 1) {
        //       localStorage.setItem('userName', this.ruleForm.username)
        //       this.$router.push('/Info')
        //       this.notify('登录成功', 'success')
        //     }
        //     if (res.code == 0) {
        //       this.notify('验证码错误', 'error')
        //     }
        //     if (res.code == 2) {
        //       this.notify('用户名或密码错误', 'error')
        //     }
        //   })
        // } else {
        //   return false
        // }
      })
    },
    // 点击图片更换验证码
    resetImg () {
      this.identifyCode = '93d2'
    //   this.imgUrl = 'http://localhost:8888/verifyCode?time=' + new Date()
    },
    randomNum (min, max) {
      return Math.floor(Math.random() * (max - min) + min)
    },
    refreshCode () {
      this.identifyCode = "'" + this.randomNum(1000, 10000) + "'"
    },
    // 重置
    resetForm (formName) {
    //   this.$refs[formName].resetFields()
    },
    showPass () {
    //   if (this.passwordVisible === 'text') {
    //     this.passwordVisible = 'password'
    //     // 更换图标
    //     this.icon = 'el-icon-view'
    //   } else {
    //     this.passwordVisible = 'text'
    //     this.icon = 'el-icon-lock'
    //   }
    }
  }
}
</script>

<style scoped>
.login-wrap {
  position: relative;
  /* background: url("../assets/img/background1.jpg"); */
  background-attachment: fixed;
  background-position: center;
  background-size: cover;
  width: 100%;
  height: 100%;
}
.ms-title {
  position: absolute;
  top: 50%;
  width: 100%;
  margin-top: -230px;
  text-align: center;
  font-size: 30px;
  font-weight: 600;
  color: #fff;
}
.ms-login {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 300px;
  height: 260px;
  margin-left: -190px;
  margin-top: -150px;
  padding: 40px;
  border-radius: 5px;
  /* 调整透明度 */
  opacity: 0.9;
  filter: alpha(opacity=90);
  background: #fff;
}
.login-btn {
  text-align: center;
}
.login-btn button {
  /* width: 100%; */
  height: 36px;
}

.form {
  position: relative;
}

.remeberMe {
  text-align: left;
  margin: 0 0 15px 0;
}

.vertify_code {
  width: 180px;
}
.vertify_img {
  position: absolute;
  right: 0;
  bottom: 0;
  width: 110px;
}
</style>
