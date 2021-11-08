<template>
    <div class="text-form">
        <el-form :model="result" :rules="rules" ref="thisForm" label-width="100px">
            <el-form-item label="标题" prop="title">
                <el-input v-model="result.title" clearable placeholder="菜单名称"></el-input>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
  name: 'text-form',
  data () {
    return {
      result: {
        title: '标题这里'
      }
    }
  }
}
</script>
