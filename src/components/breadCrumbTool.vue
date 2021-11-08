<template>
    <div class="app-crumb">
        <el-container class="cls-container">
        <el-page-header @back="goBack()" v-if="isShow"></el-page-header>
        <el-breadcrumb separator-class="el-icon-arrow-right" style="font-size:14px; line-height:24px;">
            <el-breadcrumb-item v-for="(row, index) in crumb" :key="index">{{ row.title }}</el-breadcrumb-item>
        </el-breadcrumb>
        </el-container>
    </div>
</template>

<script>
export default {
  name: 'app-crumb',
  props: ['data'],
  computed: {
    // eslint-disable-next-line vue/return-in-computed-property
    crumb () {
      let temp = [{title: this.G.hostName}]
      this.$route.matched.filter((item, index, self) => {
        if (item.meta.crumb && item.meta.crumb.length > 0) {
          temp = temp.concat(item.meta.crumb)
        }
      })
      return temp
    },
    isShow () {
      if (this.$route.meta.parent) {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    // 返回上一页
    goBack () {
      if (window.history.length <= 1) {
        this.$router.push({ path: '/' })
        return false
      } else {
        this.$router.go(-1)
      }
    }
  }
}
</script>
