<template>
  <div class="com-container">
    <div class="com-chart" ref="hot_ref"></div>
    <span class="iconfont arr-left" @click="toLeft" :style="comStyle"
      >&#xe6ef;</span
    >
    <span class="iconfont arr-right" @click="toRight" :style="comStyle"
      >&#xe6ed;</span
    >
    <span class="cat-name" :style="comStyle">{{ catName }}</span>
  </div>
</template>

<script>
export default {
  name: 'hot',
  data() {
    return {
      chartInstance: null,
      allData: null,
      currentIndex: 0,
      titleFontSize: 0
    }
  },
  created() {
    this.$socket.registerCallBack('hotData', this.getData)
  },
  mounted() {
    this.initChatr()
    // this.getData()
    this.$socket.send({
      action: 'getData',
      socketType: 'hotData',
      chartName: 'hotproduct',
      value: ''
    })
    window.addEventListener('resize', this.screenAdater)
    this.screenAdater()
  },
  computed: {
    catName() {
      if (!this.allData) {
        return ''
      }
      return this.allData[this.currentIndex].name
    },
    comStyle() {
      return {
        fontSize: this.titleFontSize + 'px'
      }
    }
  },
  sestoryed() {
    window.removeEventListener('resize', this.screenAdater)
    this.$socket.unRegisterCallBack('hotData')
  },
  methods: {
    initChatr() {
      this.chartInstance = this.$echarts.init(this.$refs.hot_ref, 'chalk')
      const initOption = {
        title: {
          text: '| 热销商品占比',
          left: 20,
          top: 20
        },
        legend: {
          top: '15%',
          icon: 'circle'
        },
        tooltip: {
          show: true,
          farmatter: (arg) => {
            const thirdCategory = arg.data.children
            const total = 0
            thirdCategory.forEach((item) => total + item.value)
            let retStr = ''
            thirdCategory.forEach((item) => {
              retStr += `
                ${item.name}: ${parseInt((item.value / total) * 100)}% <br />
              `
            })
            return retStr
          }
        },
        series: [
          {
            type: 'pie',
            label: {
              show: false
            },
            emphasis: {
              label: {
                show: true
              },
              labelLine: {
                show: false
              }
            }
          }
        ]
      }
      this.chartInstance.setOption(initOption)
    },
    // async getData() {
    //   const { data: ret } = await this.$http.get('hotproduct')
    //   this.allData = ret
    //   this.updateChart()
    // },
    getData(ret) {
      console.log(ret)
      this.allData = ret
      this.updateChart()
    },
    updateChart() {
      const seriesData = this.allData[this.currentIndex].children.map(
        (item) => {
          return {
            name: item.name,
            value: item.value,
            children: item.children
          }
        }
      )
      const dataOption = {
        series: [
          {
            data: seriesData
          }
        ]
      }
      this.chartInstance.setOption(dataOption)
    },
    screenAdater() {
      this.titleFontSize = (this.$refs.hot_ref.offsetWidth / 100) * 3.6

      const adaterOption = {
        title: {
          textStyle: {
            fontSize: this.titleFontSize
          }
        },
        legend: {
          itemWidth: this.titleFontSize,
          itemHeight: this.titleFontSize,
          itemGap: this.titleFontSize / 2,
          textStyle: {
            fontSize: this.titleFontSize / 2
          }
        },
        series: [
          {
            radius: this.titleFontSize * 7.5,
            center: ['50%', '60%']
          }
        ]
      }
      this.chartInstance.setOption(adaterOption)
      this.chartInstance.resize()
    },
    toLeft() {
      this.currentIndex--
      if (this.currentIndex < 0) {
        this.currentIndex = this.allData.length - 1
      }
      this.updateChart()
    },
    toRight() {
      this.currentIndex++
      if (this.currentIndex > this.allData.length - 1) {
        this.currentIndex = 0
      }
      this.updateChart()
    }
  }
}
</script>

<style lang="less" scoped>
.arr-left {
  position: absolute;
  left: 10%;
  top: 60%;
  transform: translateY(-50%);
  cursor: pointer;
  color: white;
}
.arr-right {
  position: absolute;
  right: 10%;
  top: 60%;
  transform: translateY(-50%);
  cursor: pointer;
  color: white;

}
.cat-name {
  position: absolute;
  left: 80%;
  bottom: 20px;
  color: white;
}
</style>
