<template>
   <fragment class="app-navMenu">
     <template v-for="navMenu in navMenus">
      <!-- 只有一级菜单的情况 -->
      <el-menu-item
       v-show="!navMenu.childs&&navMenu.ismenu==1"
        :key="navMenu.id + '_1'"
        :index="navMenu.rulelink"
        :route="navMenu.rulelink"
        :data="navMenu">
        <i v-if="navMenu.icon" :class="navMenu.icon"></i>
        <span slot="title">{{navMenu.title}}</span>
      </el-menu-item>
      <!-- 有两级，但是下一级为不是菜单的情况 -->
      <el-menu-item
       v-show="navMenu.childs&&((navMenu.childs.length>0&&navMenu.childs[0].ismenu!=1)||navMenu.childs.length==0)&&navMenu.ismenu==1"
        :key="navMenu.id + '_2'"
        :index="navMenu.rulelink"
        :route="navMenu.rulelink"
        :data="navMenu">
        <i v-if="navMenu.icon" :class="navMenu.icon"></i>
        <span slot="title">{{navMenu.title}}</span>
      </el-menu-item>
      <!-- 有两级菜单的情况 -->
      <el-submenu
      v-show="navMenu.childs&&navMenu.childs.length>0&&navMenu.childs[0].ismenu==1&&navMenu.ismenu==1"
        :key="navMenu.id + '_3'"
        :index="navMenu.rulelink">
        <template slot="title">
          <i :class="navMenu.icon"></i>
          <span slot="title">{{ navMenu.title }}</span>
        </template>
        <!-- 递归 -->
        <app-navMenu :navMenus="navMenu.childs"></app-navMenu>
      </el-submenu>
    </template>
   </fragment>
</template>

<style scoped>
.el-menu-item {
  min-width: unset;
  padding: unset;
}
</style>

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
