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
        <el-descriptions title="" direction="vertical" :column="4" border class="cls-draw-desc">
            <el-descriptions-item label="ID">{{ result.id }}</el-descriptions-item>
            <el-descriptions-item label="大小[字节]">{{ result.filesize }}</el-descriptions-item>
            <el-descriptions-item label="宽">{{ result.imagewidth }}</el-descriptions-item>
            <el-descriptions-item label="高">{{ result.imageheight }}</el-descriptions-item>

            <el-descriptions-item label="类型">{{ result.imagetype }}</el-descriptions-item>
            <el-descriptions-item label="mimetype">{{ result.mimetype }}</el-descriptions-item>
            <el-descriptions-item label="存储" :span="2">{{ result.storage }}</el-descriptions-item>
            <el-descriptions-item label="是否绑定业务">
                <el-tag size="small" type="success" v-if="result.ticket_id!=0">是</el-tag>
                <el-tag size="small" type="danger" v-else>否</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="绑定业务ID">{{ result.ticket_id }}</el-descriptions-item>
            <el-descriptions-item label="业务类型" :span="2">{{ result.ticket_type }}</el-descriptions-item>

            <el-descriptions-item label="用户账号" :span="2">{{ result.username }}</el-descriptions-item>
            <el-descriptions-item label="管理员" :span="2">{{ result.admin }}</el-descriptions-item>
            <el-descriptions-item label="修改时间" :span="2">{{ result.updatetime }}</el-descriptions-item>
            <el-descriptions-item label="创建时间" :span="2">{{ result.createtime }}</el-descriptions-item>
            <el-descriptions-item label="参数"> <pre>{{ result.extparam }}</pre> </el-descriptions-item>
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
