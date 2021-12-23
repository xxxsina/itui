<template>
    <div class="app-detail">
        <el-drawer
        ref="drawerTool"
        class="cls-draw"
        title="详情"
        @close="closeDraw()"
        :size="drawerSize"
        :visible.sync="drawer"
        :with-header="true">
        <el-descriptions :title="'用户 ' + result.username + ' 详情'" direction="vertical" :column="3" border class="cls-draw-desc">
            <el-descriptions-item label="ID">{{ result.id }}</el-descriptions-item>
            <el-descriptions-item label="账号">{{ result.username }}</el-descriptions-item>
            <el-descriptions-item label="昵称" :span="2">{{ result.profile.nickname }}</el-descriptions-item>
            <el-descriptions-item label="状态">
                <el-tag size="small" type="success" v-if="result.status==1">正常</el-tag>
                <el-tag size="small" type="danger" v-else>禁止</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="VIP到期状态">
              <el-tag size="small" type="info" v-if="result.profile.vip_expire_status==2">未设置</el-tag>
              <el-tag size="small" type="success" v-if="result.profile.vip_expire_status==1">正常</el-tag>
              <el-tag size="small" type="danger" v-if="result.profile.vip_expire_status==0">过期</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="VIP到期时间" :span="2" label-class-name="cls-tb-label" content-class-name="cls-tb-content">
              {{ result.profile.vip_expire_text }}
            </el-descriptions-item>
            <el-descriptions-item label="注册时间">{{ result.createtime }}</el-descriptions-item>
            <el-descriptions-item label="上次登录时间">{{ result.prevtime }}</el-descriptions-item>
            <el-descriptions-item label="最后登录时间" :span="2">{{ result.logintime }}</el-descriptions-item>
            <el-descriptions-item label="注册IP">{{ result.joinip }}</el-descriptions-item>
            <el-descriptions-item label="最后登录IP">{{ result.loginip }} 『 {{ result.addressIp }} 』</el-descriptions-item>
            <el-descriptions-item label="登录失败次数" :span="2">{{ result.loginfailure }}</el-descriptions-item>
            <el-descriptions-item label="头像">
                <el-image
                  style="width: 100px; height: 100px"
                  v-if="result.profile.avatar"
                  :src="G.imgHost + result.profile.avatar"
                  fit="contain">
                </el-image>
                <el-image
                  style="width: 100px; height: 100px"
                  v-if="!result.profile.avatar"
                  :src="G.imgErrPath"
                  fit="contain">
                </el-image>
            </el-descriptions-item>
        </el-descriptions>
        </el-drawer>
    </div>
</template>

<style scoped>
.cls-draw >>> header {
    background-color: #2c3e50;
    line-height: 50px;
    padding: 0 20px;
    color: white;
}
.cls-draw-desc {
    margin: 0  10px;
}
.el-button {
    margin-left: unset;
}
.cls-draw >>> .cls-tb-label {
    background: #E1F3D8;
    font-weight: bold;
}
.cls-draw >>> .cls-tb-content {
    background: #FDE2E2;
    font-weight: bold;
}
</style>

<script>
export default {
  name: 'app-detail',
  props: ['result'],
  methods: {
    showDraw () {
      this.drawer = true
    },
    closeDraw () {
      return false
    }
  },
  data () {
    return {
      drawer: false,
      drawerSize: this.G.getDrawerSize()
    }
  }
}
</script>
