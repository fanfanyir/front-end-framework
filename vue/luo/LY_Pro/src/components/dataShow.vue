<template>
  <div class="dataShow">
    <charts v-bind:msg='msg'  v-if="flag"></charts>
  </div>
</template>

<script>
import charts from '../common/charts'
import axios from 'axios'
export default {
  name: 'dataShow',
  components: {
    charts
  },
  data () {
    return {
      msg: {},
      flag: false
    }
  },
  mounted () {
      this.getSelect()
  },
  methods: {
    getSelect(){
      let that = this
      axios.get('http://39.96.47.5:8089/beego/select', {
        params: {}
      }).then ((res) => {
        that.msg = res.data.data
        this.flag = true
      }).catch (function (err) {
        console.log(err)
        that.$message.error('服务器错误')
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped="" type="text/css"></style>
