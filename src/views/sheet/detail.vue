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
            <el-descriptions-item label="状态" :span="2">
                <el-tag size="small" type="success" v-if="result.status==1">正常</el-tag>
                <el-tag size="small" type="danger" v-if="result.status==2">禁止</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="表单名称">{{ result.name }}</el-descriptions-item>
            <el-descriptions-item label="填写次数" label-class-name="cls-tb-label" content-class-name="cls-tb-content">{{ result.total }}</el-descriptions-item>
            <el-descriptions-item label="访问上限" :span="2">{{ result.total_limit }}</el-descriptions-item>
            <el-descriptions-item label="是否填写姓名">
                <el-tag size="small" type="success" v-if="result.is_realname==1">是</el-tag>
                <el-tag size="small" type="danger" v-if="result.is_realname!=1">否</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="是否填写电话">
                <el-tag size="small" type="success" v-if="result.is_phone==1">是</el-tag>
                <el-tag size="small" type="danger" v-if="result.is_phone!=1">否</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="是否上传图片" :span="2">
                <el-tag size="small" type="success" v-if="result.is_image==1">是</el-tag>
                <el-tag size="small" type="danger" v-if="result.is_image!=1">否</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="创建时间">{{ result.createtime }}</el-descriptions-item>
            <el-descriptions-item label="修改时间" :span="3">{{ result.updatetime }}</el-descriptions-item>
            <el-descriptions-item label="表单连接" :span="4">{{ result.short_url_text }}</el-descriptions-item>
            <el-descriptions-item label="填写完后跳转的地址" :span="4">{{ result.url }}</el-descriptions-item>
            <el-descriptions-item label="填写完后显示的二维码" :span="4">
                <el-image
                  v-if="result.image"
                  style="width: 100px; height: 100px"
                  :src="this.G.imgHost + result.image"
                  fit="contain"></el-image>
            </el-descriptions-item>
            <el-descriptions-item label="备注" :span="3">{{ result.remark }}</el-descriptions-item>
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
