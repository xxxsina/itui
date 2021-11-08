<template>
    <div class="app-header" ref="baseApp">
        <el-header style="height:50px;">
            <el-container>
                <el-col :sm="1" class="cls-i-fold">
                    <i :class="{ 'el-icon-s-unfold': fold, 'el-icon-s-fold': !fold }" @click="handlerFold()"></i>
                </el-col>
                <el-col :sm="20">
                    <div style="text-align: left; font-family: cursive; color: #fff;">
                        <!-- 科技改变生活 -->
                        😁
                    </div>
                </el-col>
                <el-col :sm="4">
                    <el-dropdown trigger="click" placement="bottom-start">
                        <span class="el-dropdown-link">
                            <el-avatar class="cls-avatar-img cls-avatar-img-username" shape="square"
                            :size="30"
                            :src="data.users.avatar"
                            @error="errorHandler">
                                <img :src="this.G.imgErrPath" />
                            </el-avatar>
                            {{ data.users.username }}
                        </span>
                        <el-dropdown-menu class="cls-dropdown-menu" slot="dropdown">
                            <el-dropdown-item class="cls-drop-item-user-img">
                                <el-avatar class="cls-avatar-img" shape="square"
                                :size="120"
                                :src="data.users.avatar"
                                @error="errorHandler">
                                    <img :src="this.G.imgErrPath" />
                                </el-avatar>
                                <el-card class="box-card"
                                shadow="never"
                                :body-style="{ padding: '6px', 'background-color': '#18bc9c'}">
                                    <div class="text item">登录时间: 2000</div>
                                    <div class="text item">会员等级: 2000</div>
                                </el-card>
                            </el-dropdown-item>
                            <el-dropdown-item class="cls-drop-item-user-bottom">
                                <el-row>
                                    <el-col :span="8" :offset="2">
                                        <el-link :underline=false class="cls-col-a1" href="#/system/admin">
                                            <i class="el-icon-user-solid"></i>
                                            个人资料
                                        </el-link>
                                    </el-col>
                                    <el-col :span="8" :offset="5">
                                        <el-link :underline=false class="cls-col-a2" href="/">
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
export default {
  name: 'app-header',
  props: ['data'],
  mounted () {
    this.getClientWidth()
  },
  methods: {
    errorHandler () {
      return true
    },
    handlerFold () {
      this.fold = !this.fold
      this.data.isCollapse = !this.data.isCollapse
    },
    getClientWidth () {
      this.clientWidth = this.$refs.baseApp.clientWidth
    }
  },
  data () {
    return {
      clientWidth: 0,
      fold: this.data.isCollapse
    }
  }
}
</script>

<style scoped>
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
    padding: 10px 0;
    line-height: 100%;
    text-decoration: unset;
    cursor: default;
}
.cls-drop-item-user-img:hover {
    background-color: #18bc9c;
}
.cls-drop-item-user-bottom {
    padding: 10px 0;
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
