<template>
  <div class="charts" ref="charts"></div>
</template>

<script>
import echarts from 'echarts'
export default {
  name: 'charts',
  props: {
    msg: {
      required: true
    }
  },
  data () {
    return {
      legendData: [],
      series: []
    }
  },
  methods: {
    setData(){
      let msgData = this.msg.Datamap
      for (let item in msgData){
        this.legendData.push(item);
        for(let i = 0;i<msgData[item].length;i++){
          if(msgData[item][i] == 0){
            msgData[item][i] = null
          }
        }
        let seriesItem = {
          name: item,
          type: 'line',
          connectNulls: true,
          stack: '总量',
          data: msgData[item]
        }
        this.series.push(seriesItem);
      }
      this.initChart()
    },
    initChart () {
      var initChart = echarts.init(this.$refs.charts)
      // 绘制图表
      initChart.setOption({
        title: {
          text: '折线图堆叠'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: this.legendData
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: this.msg.Xdata
        },
        yAxis: {
          type: 'value'
        },
        series: this.series
      })
    }
  },
  mounted () {
    this.setData();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped="" type="text/css">
  .charts {
    width: 900px;
    height: 400px;
    margin: 0 auto;
    padding-top: 30px;
  }
</style>
