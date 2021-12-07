<template>
    <div class="app-header" ref="baseApp">
        <el-header style="height:50px;">
            <el-container>
                <el-col :sm="1" class="cls-i-fold">
                    <i :class="{ 'el-icon-s-unfold': fold, 'el-icon-s-fold': !fold }" @click="handlerFold()"></i>
                </el-col>
                <el-col :sm="20">
                    <div style="text-align: left; font-family: cursive; color: #fff;">
                        科技改变生活
                    </div>
                </el-col>
                <el-col :sm="3">
                    <el-dropdown trigger="click" placement="bottom-start">
                        <el-row class="el-dropdown-link">
                            <el-col :sm="5" :offset="3">
                                <el-avatar class="cls-avatar-img cls-avatar-img-username" shape="square"
                                :size="30"
                                :src="imageUrl">
                                    <img :src="this.G.imgErrPath" />
                                </el-avatar>
                            </el-col>
                            <el-col v-if="!this.G.isMobileInterView()" :sm="8" :offset="1" style="line-height:34px;">{{ result.username }}</el-col>
                            <el-col v-if="!this.G.isMobileInterView()" :sm="8" :offset="1" style="line-height:0;">{{ result.nickname }}</el-col>
                        </el-row>
                        <el-dropdown-menu class="cls-dropdown-menu" slot="dropdown">
                            <el-dropdown-item class="cls-drop-item-user-img" style="background-color: #18bc9c;padding: 10px 0;">
                                <el-avatar class="cls-avatar-img" shape="square"
                                :size="120"
                                :src="imageUrl"
                                @error="errorHandler">
                                    <img :src="this.G.imgErrPath" />
                                </el-avatar>
                                <el-card class="box-card"
                                shadow="never"
                                :body-style="{ padding: '6px', 'background-color': '#18bc9c'}">
                                    <div v-if="this.G.isMobileInterView()" class="text item">账号: {{ result.username }}</div>
                                    <div v-if="this.G.isMobileInterView()" class="text item">昵称: {{ result.nickname }}</div>
                                    <div class="text item">角色: {{ result.group_name }}</div>
                                </el-card>
                            </el-dropdown-item>
                            <el-dropdown-item class="cls-drop-item-user-bottom" style="padding: 10px 0;">
                                <el-row>
                                    <el-col :span="8" :offset="2">
                                        <el-link :underline=false class="cls-col-a1" href="#/system/profile">
                                            <i class="el-icon-user-solid"></i>
                                            个人资料
                                        </el-link>
                                    </el-col>
                                    <el-col :span="8" :offset="5">
                                        <el-link :underline=false class="cls-col-a2" @click="signOut">
                                            <i class="el-icon-error"></i>
                                            退出登录
                                        </el-link>
                                    </el-col>
                                </el-row>
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </el-col>
            </el-container>
      </el-header>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'app-header',
  props: ['data'],
  mounted () {
    this.getClientWidth()
    this.profile()
  },
  computed: {
    // 这里是获取vuex值的方式，要在计算属性里面
    ...mapGetters([
      'adminInfo'
    ])
  },
  methods: {
    // 这里是获取vuex函数的方式，要在methods里面
    ...mapActions([
      'getAdminProfile',
      'logout'
    ]),
    errorHandler () {
      return true
    },
    handlerFold () {
      this.fold = !this.fold
      this.data.isCollapse = !this.data.isCollapse
    },
    getClientWidth () {
      this.clientWidth = this.$refs.baseApp.clientWidth
    },
    // 请求管理员数据
    profile () {
      this.getAdminProfile().then((res) => {
        this.result = res.data
        this.imageUrl = res.data.avatar ? this.G.imgHost + res.data.avatar : ''
      })
    },
    signOut () {
      this.$confirm('你是否要退出管理中心?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '退出成功!'
        })
        this.logout().then((res) => {
          this.$router.push('/login')
        }).catch(() => {
          this.$router.push('/login')
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    }
  },
  data () {
    return {
      imageUrl: '',
      result: {},
      clientWidth: 0,
      fold: this.data.isCollapse
    }
  },
  watch: {
    // fold (val, valnew) {
    // }
  }
}
</script>

<style scoped>
.el-header{
  background-color: #30bc9b;
  color: #333;
  text-align: center;
  line-height: 50px;
  padding: unset;
}
.cls-i-fold {
    text-align: left;
    margin-left: 10px;
}
.cls-i-fold i {
    width: 30px;
    line-height: 30px;
    cursor: pointer;
    border: 1px dotted #15a589;
    text-align: center;
}
.el-dropdown-link {
 cursor: pointer;
 color: #fff;
 font-size: 12px;
 white-space: nowrap;  /* 强制在同一行内显示所有文本，直到文本结束或者遭遇 br 对象。不换行 */
}
.cls-avatar-img-username {
    margin-right: 6px;
}
.el-icon-arrow-down {
 font-size: 12px;
}
.demonstration {
 display: block;
 color: #8492a6;
 font-size: 14px;
 margin-bottom: 20px;
}
.el-dropdown {
 display: grid;
}
.el-dropdown:hover {
    background-color: #15a589;
}
.cls-dropdown-menu {
    top: 40px !important;
    border-radius: unset;
    width: 260px;
    margin-right: -3px;
    padding: 0;
    border: unset;
}
.cls-drop-item-user-img {
    text-align: center;
    background-color: #18bc9c;
    line-height: 100%;
    text-decoration: unset;
    cursor: default;
}
.cls-drop-item-user-img:hover {
    background-color: #18bc9c;
}
.cls-drop-item-user-bottom {
    cursor: default;
}
.cls-drop-item-user-bottom:hover {
    background-color: #fff;
}
.cls-drop-item-user-bottom a {
    background-color: #F05050;
    line-height: 30px;
    padding: 0 6px;
    border-radius: 3px;
    color: white;
    font-weight: unset;
    font-size: 12px;
}
.cls-drop-item-user-bottom .cls-col-a1 {
    background-color: #2c3e50;
}
.cls-drop-item-user-bottom .cls-col-a1:hover {
    background-color: #1a242f;
}
.cls-drop-item-user-bottom a:hover {
    color: white;
    border: 0;
    background-color: #e74c3c;
}
.cls-col-a1 i, .cls-col-a2 i {
    margin-right: unset;
}
.cls-col-li:hover {
    text-decoration: none;
    border: 0;
}
.cls-avatar-img {
    vertical-align: middle;
    justify-content: center;
    display: inline-flex;
}
.el-popper /deep/ .popper__arrow {
    border-bottom-color: #1EBEF4 !important;
    left: 50% !important;
    display: none;
}
.box-card {
    border: 0;
    color: #fff;
    font-size: 10px;
    font-weight: normal;
}
.box-card .item {
    padding-top: 4px;
}
</style>
