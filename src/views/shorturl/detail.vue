<template>
    <div class="app-codes-detail">
        <el-drawer
        ref="drawerTool"
        class="cls-draw"
        title="详情"
        @close="closeDraw()"
        :size="drawerSize"
        :visible.sync="drawer"
        :with-header="true">
        <el-descriptions :title="result.name" direction="vertical" :column="4" border class="cls-draw-desc">
            <el-descriptions-item label="ID">{{ result.id }}</el-descriptions-item>
            <el-descriptions-item label="账号">{{ result.username }}</el-descriptions-item>
            <el-descriptions-item label="状态" :span="2" label-class-name="cls-tb-label">
                <el-tag size="small" type="success" v-if="result.status==1">正常</el-tag>
                <el-tag size="small" type="danger" v-if="result.status==2">禁止</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="名称" label-class-name="cls-tb-label">{{ result.name }}</el-descriptions-item>
            <el-descriptions-item label="访问密码" label-class-name="cls-tb-label">{{ result.pwd }}</el-descriptions-item>
            <el-descriptions-item label="有效期" :span="2" label-class-name="cls-tb-label">{{ result.period }}</el-descriptions-item>
            <el-descriptions-item label="访问次数" label-class-name="cls-tb-label" content-class-name="cls-tb-content">{{ result.total }}</el-descriptions-item>
            <el-descriptions-item label="访问上限" :span="3" label-class-name="cls-tb-label">{{ result.total_limit }}</el-descriptions-item>
            <el-descriptions-item label="生效日期"  label-class-name="cls-tb-label">{{ result.effective_time }}</el-descriptions-item>
            <el-descriptions-item label="失效日期" :span="3" label-class-name="cls-tb-label">{{ result.lose_time }}</el-descriptions-item>
            <el-descriptions-item label="创建时间" label-class-name="cls-tb-label">{{ result.createtime }}</el-descriptions-item>
            <el-descriptions-item label="修改时间" :span="3" label-class-name="cls-tb-label">{{ result.updatetime }}</el-descriptions-item>
            <el-descriptions-item label="短连接" :span="4" label-class-name="cls-tb-label">{{ result.url_addr }}</el-descriptions-item>
            <el-descriptions-item label="原连接" :span="4" label-class-name="cls-tb-label">{{ result.url }}</el-descriptions-item>
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
  name: 'app-codes-detail',
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
