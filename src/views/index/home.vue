<template>
    <div class="home">
        hello world - home page
        <el-container class="cls-container cls-container-op">
          <el-button type="primary" @click="showDialogTool()" style="padding: 9px 12px;">
            <i class="el-icon-plus"></i>
            button
          </el-button>
          <el-button type="primary" @click="clickVuex()" style="padding: 9px 12px;">
            <i class="el-icon-plus"></i>
            vuex store test
          </el-button>
          <el-button type="primary" :loading="loading" @click="clickLogin()" style="padding: 9px 12px;">
            <i class="el-icon-plus"></i>
            vuex login
          </el-button>
        </el-container>
        <dialogTool ref="dialogTool" :data='dialogToolDataDefault'>
          <xxx ref="thisForm" slot="slotEditForm" :result='result' :data='dialogToolDataDefault'></xxx>
        </dialogTool>
    </div>
</template>

<script>
import xxx from './form'

export default {
  name: 'home',
  components: {xxx},
  methods: {
    // vuex 例子讲解
    clickVuex () {
      // 通过commit调用vuex mutations里面的方法
      // 这里的第一个参数是要触发的方法，也就是上面mutations中的方法，第二个参数是你要传递的数据
      this.$store.commit('savePath', 'about/me')
      // 获取方法：this.$store.state.变量名
      // 如下
      let xxname = this.$store.state.pathName
      this.$message.error(xxname)
      console.log(xxname)
    },
    // vuex login
    clickLogin () {
      // this.$refs.loginForm.validate(valid => {
      //   if (valid) {

      //   } else {
      //     console.log('error submit!!')
      //     return false
      //   }
      // })
      let _data = {
        'username': '20190901006',
        'password': '423423'
      }
      this.loading = true
      this.$store.dispatch('LoginByUsername', _data).then(() => {
        this.loading = false
        // this.$router.push({ path: '/' })
        this.$message.success('登录成功！')
      }).catch(() => {
        this.loading = false
      })
    },
    // 显示表单
    showDialogTool () {
      // 显示dialog
      this.$refs.dialogTool.showDialog()
      // eslint-disable-next-line eqeqeq
      // 重试set表单的值
      // this.$refs.thisForm.setData(false)
      // 更新表单的值为初始值
      // this.$refs.thisForm.resetForm()
    }
  },
  data () {
    return {
      dialogToolDataDefault: {
        title: '添加',
        visible: false
      },
      loading: false,
      result: {}
    }
  }
}
</script>
