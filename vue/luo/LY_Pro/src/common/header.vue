<template>
  <div class="header">
    <div class="logo-title">
      <img class="logo" src="../assets/chrome-logo.svg" alt="">
      <span class="title">调度器平台</span>
    </div>
    <el-menu
      :default-active="defaultActivePath"
      class="el-menu-horizontal"
      mode="horizontal"
      @select="handleSelect"
      router>
      <el-menu-item index="/taskAllocation">处理中心</el-menu-item>
      <el-menu-item index="/dataShow">数据展示</el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  data () {
    return {
      defaultActivePath: ''
    }
  },
  watch: {
    $route (to, from) {
      this.defaultActivePath = to.path
    }
  },
  components: {},
  mounted () {
    this.defaultActivePath = this.$route.path
  },
  methods: {
    handleSelect (key, keyPath) {
    }
  }
}
</script>

<style lang="scss" scoped="" type="text/css">
  .header {
    height: 50px;
    border-bottom: 0.5px solid #DCDFE6;
    overflow: hidden;
    .logo-title {
      float: left;
      height: 50px;
      .logo {
        margin-left: 20px;
        width: 30px;
        height: 30px;
        vertical-align: middle;
      }
      .title {
        color: #303133;
        line-height: 50px;
        margin-left: 10px;
        font-weight: bold;
      }
    }
    .el-menu-horizontal {
      float: left;
      margin-left: 20px;
      .el-menu-item {
        height: 50px;
        line-height: 50px;
      }
    }
  }
</style>
