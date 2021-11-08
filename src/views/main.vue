/* eslint-disable vue/no-duplicate-attributes */
<template>
  <div id="app">
      <el-container style="height:100%; line-height:100%;">
        <!-- 头部 -->
        <el-aside style="width: auto;">
          <el-menu
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
            <el-footer style="height:36px;"><app-footer :data='result'></app-footer></el-footer>
        </el-container>
    </el-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import header from '@/views/layout/header'
import footer from '@/views/layout/footer'
import navMenu from '@/views/layout/navMenu'

export default {
  name: 'App',
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
  methods: {
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
  mounted () {
    // let start = window.location.href.lastIndexOf('#')
    // let path = window.location.href.slice(start + 1)
    // this.activeIndex = path || 'home'
    // console.log(this.$route)
  },
  created () {
    // eslint-disable-next-line no-undef
    // console.log(this.menuData)
    // 加载menu数据
    this.G.setMenu(this.menuBar)
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
  data () {
    return {
      isRouterAlive: true,
      nowIndexMenu: '',
      // activeIndex: this.$route.path,
      result: {
        isCollapse: this.G.isFoldMenu(), // 是否折叠menu 和 是否缩小logo字体
        companyName: '信息技术有限公司',
        copyright: '川ICP备000000000号',
        copyrightdate: '2022',
        users: {
          username: '13880789545',
          islogin: true,
          avatar: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
        }
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
html, body, #app {
  padding: 0;
  margin: 0;
  height: 100%;
}
.el-header{
  background-color: #30bc9b;
  color: #333;
  text-align: center;
  line-height: 50px;
  padding: unset;
}
.el-main {
  background-color: #f1f4f6;
  color: #333;
}
.el-footer {
  padding: 0;
}
.cls-company {
  background-color:#15a589;
  font-size: 18px;
  color: #fff;
  text-align: center;
  line-height: 50px;
}
.el-menu {
  height: 100%;
  /* width: 100%; */
  border-right: unset;
}
.el-menu-item, .el-submenu__title {
  /* height: 50px; */
}
.cls-header-menu {
  background-color:#15a589;
}
.cls-header-menu > li > div > i {
  display: none;
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
</style>
