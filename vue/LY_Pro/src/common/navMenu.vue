<template>
  <div class="nav-menu">
    <el-row class="tac">
      <el-col>
        <el-menu
          :default-active="defaultActivePath"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          router>
          <el-menu-item index="/taskAllocation">
            <i class="el-icon-location"></i>
            <span>任务配置</span>
          </el-menu-item>
          <el-menu-item index="/dataShow">
            <i class="el-icon-menu"></i>
            <span>数据展示</span>
          </el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
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
  methods: {
    handleOpen () {
      console.log('Open')
    },
    handleClose () {
      console.log('Close')
    }
  },
  mounted () {
    this.defaultActivePath = this.$route.path
  }
}
</script>

<style lang="scss" scoped="" type="text/css">
.nav-menu {
  width: 210px;
  height: 100%;
  .tac {
    height: 100%;
    .el-col {
      height: 100%;
      .el-menu {
          height: 100%;
      }
    }
  }
}
</style>
