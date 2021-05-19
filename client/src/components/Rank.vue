<template>
  <div class="com-container">
    <div class="com-chart" ref="rank_ref"></div>
  </div>
</template>

<script>
export default {
  name: 'rank',
  data() {
    return {
      chartInstance: null,
      allData: null,
      startValue: 0,
      endValue: 9,
      timerId: null
    }
  },
  created() {
    this.$socket.registerCallBack('rankData', this.getData)
  },
  mounted() {
    this.initChatr()
    // this.getData()
    this.$socket.send({
      action: 'getData',
      socketType: 'rankData',
      chartName: 'rank',
      value: ''
    })
    window.addEventListener('resize', this.screenAdater)
    this.screenAdater()
  },
  sestoryed() {
    window.removeEventListener('resize', this.screenAdater)
    clearInterval(this.timerId)
    this.$socket.unReginsterCallBack('rankData')
  },
  methods: {
    initChatr() {
      this.chartInstance = this.$echarts.init(this.$refs.rank_ref, 'chalk')
      const initOption = {
        title: {
          text: '| 地区销售排行',
          left: 20,
          top: 20
        },
        grid: {
          top: '40%',
          left: '5%',
          right: '5%',
          bottom: '5%',
          containLabel: true
        },
        tooltip: {
          show: true,
          trigger: 'axis'
        },
        xAxis: {
          type: 'category'
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            type: 'bar'
          }
        ]
      }
      this.chartInstance.setOption(initOption)
      this.chartInstance.on('mouseover', () => {
        clearInterval(this.timerId)
      })
      this.chartInstance.on('mouseout', () => {
        this.startInterval()
      })
    },
    // async getData() {
    //   const { data: ret } = await this.$http.get('rank')
    //   this.allData = ret
    //   this.allData.sort((a, b) => a.value - b.value)
    //   this.updateChart()
    //   this.startInterval()
    // },
    getData(ret) {
      this.allData = ret
      this.updateChart()
      this.startInterval()
    },
    updateChart() {
      const colorArr = [
        ['#0BA82C', '#4FF778'],
        ['#2E72BF', '#23E5E5'],
        ['#5052EE', '#AB6EE5']
      ]
      const privinceArr = this.allData.map((item) => item.name)
      const valueArr = this.allData.map((item) => item.value)
      const dataOption = {
        xAxis: {
          data: privinceArr
        },
        dataZoom: {
          show: false,
          startValue: this.startValue,
          endValue: this.endValue
        },
        series: [
          {
            data: valueArr,
            itemStyle: {
              color: (arg) => {
                let targetColorArr = null
                if (arg.value > 300) {
                  targetColorArr = colorArr[0]
                } else if (arg.value > 200) {
                  targetColorArr = colorArr[1]
                } else {
                  targetColorArr = colorArr[2]
                }
                return new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: targetColorArr[0]
                  },
                  {
                    offset: 1,
                    color: targetColorArr[1]
                  }
                ])
              }
            }
          }
        ]
      }
      this.chartInstance.setOption(dataOption)
    },
    screenAdater() {
      const titileFontSize = (this.$refs.rank_ref.offsetWidth / 100) * 3.6
      const adaterOption = {
        title: {
          textStyle: {
            fontSize: titileFontSize
          }
        },
        series: [
          {
            barWidth: titileFontSize,
            itemStyle: {
              barBorderRadius: [titileFontSize / 2, titileFontSize / 2, 0, 0]
            }
          }
        ]
      }
      this.chartInstance.setOption(adaterOption)
      this.chartInstance.resize()
    },
    startInterval() {
      if (this.timerId) {
        clearInterval(this.timerId)
      }
      this.timerId = setInterval(() => {
        this.startValue++
        this.endValue++
        if (this.endValue > this.allData.length - 1) {
          this.startValue = 0
          this.endValue = 9
        }
        this.updateChart()
      }, 2000)
    }
  }
}
</script>

<style>
</style>
