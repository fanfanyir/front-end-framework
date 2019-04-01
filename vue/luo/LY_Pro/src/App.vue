<template>
  <div id="app">
    <router-view></router-view>
    <!-- <el-container>
      <el-header>
        <taskHead></taskHead>
      </el-header>
      <el-container>
        <el-aside>
          <navMenu></navMenu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container> -->
  </div>
</template>

<script>
// import navMenu from './common/navMenu'
// import taskHead from './common/header'
export default {
  data () {
    return {
      login: 'false'
    }
  },
  // components: {
  //   navMenu,
  //   taskHead
  // }
}
</script>

<style lang="scss" scoped="" type="text/css">
.el-header {
  height: auto !important;
  padding: 0;
}
.el-aside {
  width: auto !important;
}
.el-main {
  padding-top: 0;
}
</style>
