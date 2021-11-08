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
        <el-descriptions :title="result.username + '操作详情'" direction="vertical" :column="4" border class="cls-draw-desc">
            <el-descriptions-item label="ID">{{ result.id }}</el-descriptions-item>
            <el-descriptions-item label="账号">{{ result.username }}</el-descriptions-item>
            <el-descriptions-item label="操作时间" :span="3">{{ result.createtime }}</el-descriptions-item>
            <el-descriptions-item label="操作名称">{{ result.title }}</el-descriptions-item>
            <el-descriptions-item label="操作地址">{{ result.url }}</el-descriptions-item>
            <el-descriptions-item label="操作IP地址" :span="3">{{ result.ip }}</el-descriptions-item>
            <el-descriptions-item label="数据内容" :span="4">{{ result.content }}</el-descriptions-item>
            <el-descriptions-item label="操作浏览器" :span="4">{{ result.useragent }}</el-descriptions-item>
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
    errorHandler () {
      return true
    },
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
