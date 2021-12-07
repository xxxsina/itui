/* eslint-disable vue/no-duplicate-attributes */
<template>
  <div id="xmain">
      <el-container style="height:100%; line-height:100%;">
        <!-- 头部 -->
        <el-aside style="width: auto;">
          <el-menu
            style="border-right: 0px;height: 100%;"
            ref="menu"
            class="el-menu-vertical-demo"
            background-color="#222d32"
            text-color="#fff"
            active-text-color="#ffd04b"
            :default-active="activeIndex"
            :collapse="result.isCollapse"
            :unique-opened="true"
            @select="handleSelect"
            @open="handleOpen"
            router>
            <el-row>
              <div class="grid-content bg-purple cls-company" :class="{ reduceFont: result.isCollapse }">
              {{ G.hostName }}
              </div>
            </el-row>
            <app-navMenu :navMenus='menuBar'></app-navMenu>
          </el-menu>
        </el-aside>
        <el-container>
            <!-- 头部 -->
            <app-header :data='result'></app-header>
            <!-- 主要内容 -->
            <el-main>
              <!-- 导航面包屑 -->
              <breadCrumbTool></breadCrumbTool>
              <!-- 内容页面 -->
              <router-view v-if="isRouterAlive" name="content"></router-view>
            </el-main>
            <!-- 尾部 -->
            <el-footer style="height:36px; padding: 0;"><app-footer></app-footer></el-footer>
        </el-container>
    </el-container>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import header from '@/views/layout/header'
import footer from '@/views/layout/footer'
import navMenu from '@/views/layout/navMenu'

export default {
  name: 'xmain',
  components: {
    'app-header': header,
    'app-footer': footer,
    'app-navMenu': navMenu
  },
  // 局部刷新用
  provide () {
    return {
      reload: this.reload
    }
  },
  mounted () {
    this.getMenus()
  },
  computed: {
    // eslint-disable-next-line no-undef
    ...mapGetters([
      'menuBar'
    ]),
    // eslint-disable-next-line vue/return-in-computed-property
    activeIndex () {
      if (this.$route.meta.parent) {
        return this.$route.meta.parent
      } else {
        return this.$route.path
      }
    }
  },
  methods: {
    ...mapActions([
      'getMenus'
    ]),
    // 局部刷新用
    reload () {
      this.isRouterAlive = false
      this.$nextTick(function () {
        this.isRouterAlive = true
      })
    },
    handleOpen (index) {
      this.nowIndexMenu = index
    },
    handleSelect (index, indexPath) {
      this.$refs.menu.close(this.nowIndexMenu)
    }
  },
  data () {
    return {
      isRouterAlive: true,
      nowIndexMenu: '',
      result: {
        isCollapse: this.G.isFoldMenu() // 是否折叠menu 和 是否缩小logo字体
      }
    }
  },
  watch: {
    $route (to, from) {
      // console.log(this.$route.path)
      // this.$refs.menu.close(this.nowIndexMenu)
    }
  }
}
</script>

<style>
html, body, #xmain {
  padding: 0;
  margin: 0;
  height: 100%;
}
.el-main {
  background-color: #f1f4f6;
  color: #333;
}
.cls-company {
  background-color:#15a589;
  font-size: 18px;
  color: #fff;
  text-align: center;
  line-height: 50px;
}
.el-input__inner {
  border-radius: 2px;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
}
.reduceFont {font-size: 11px;}

.cls-container {
 padding: 10px;
 background-color: #fff;
}
.cls-container-op {
  margin-top: 10px;
}
.cls-container-tab {
  margin-top: 1px;
}
.cls-container-page {
  margin-top: 1px;
  text-align: right;
}
.el-form--inline .el-form-item {
  margin-bottom: unset;
}
.cls-container-op .el-button {
  margin-left: unset;
}

/* menus折叠后隐藏文字，坑了我好久，泥妈改变一下样式就可以了 */
/*隐藏文字 start*/
.el-menu--collapse  .el-submenu__title span{
  display: none;
}
.el-menu--collapse  .el-submenu__title .el-submenu__icon-arrow{
  display: none;
}
/*隐藏 end */
</style>
