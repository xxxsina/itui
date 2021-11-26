<template>
  <!-- <fragment class="app-navMenu"> -->
   <!-- 使用fragment的作用是在手机访问时，menus折叠了，导航文字自动隐藏掉，但是这里有个坑，就是后端过来的menus数据无法显示了 -->
   <div class="app-navMenu">
     <template v-for="navMenu in navMenus">
      <!-- 只有一级菜单的情况 -->
      <el-menu-item
       v-show="!navMenu.childs&&navMenu.ismenu==1"
        :key="navMenu.id + '_1'"
        :index="navMenu.rule"
        :route="navMenu.rule"
        :data="navMenu">
        <i v-if="navMenu.icon" :class="navMenu.icon"></i>
        <span slot="title">{{navMenu.name}}</span>
      </el-menu-item>
      <!-- 有两级，但是下一级为不是菜单的情况 -->
      <el-menu-item
       v-show="navMenu.childs&&((navMenu.childs.length>0&&navMenu.childs[0].ismenu!=1)||navMenu.childs.length==0)&&navMenu.ismenu==1"
        :key="navMenu.id + '_2'"
        :index="navMenu.rule"
        :route="navMenu.rule"
        :data="navMenu">
        <i v-if="navMenu.icon" :class="navMenu.icon"></i>
        <span slot="title">{{navMenu.name}}</span>
      </el-menu-item>
      <!-- 有两级菜单的情况 -->
      <el-submenu
      v-show="navMenu.childs&&navMenu.childs.length>0&&navMenu.childs[0].ismenu==1&&navMenu.ismenu==1"
        :key="navMenu.id + '_3'"
        :index="navMenu.rule">
        <template slot="title">
          <i :class="navMenu.icon"></i>
          <span slot="title">{{ navMenu.name }}</span>
        </template>
        <!-- 递归 -->
        <app-navMenu :navMenus="navMenu.childs"></app-navMenu>
      </el-submenu>
    </template>
   </div>
   <!-- </fragment> -->
</template>

<script>
export default {
  name: 'app-navMenu',
  props: ['navMenus'], // 这里是外部传值
  data () {
    return {
    }
  }
}
</script>
