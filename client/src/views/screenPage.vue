<template>
  <div class="screen-container">
    <header class="screen-header">
      <div>
        <img src="/static/img/header_border_dark.png" alt="" />
      </div>
      <div class="logo">
        <img src="/static/img/logo_dark.png" alt="" />
      </div>
      <div class="title">电商平台实时监控系统</div>
      <div class="title-right">
        <img src="/static/img/qiehuan_dark.png" class="qiehuan" alt="" />
        <span class="dateTime">2020-01-01 00:00:00</span>
      </div>
    </header>
    <div class="screen-body">
      <section class="screen-left">
        <div id="left-top">
          <Trend />
        </div>
        <div id="left-bottom">
          <Seller />
        </div>
      </section>
      <section class="screen-middle">
        <div id="middle-top">
          <Map />
        </div>
        <div id="middle-bottom">
          <Rank />
        </div>
      </section>
      <section class="screen-right">
        <div id="right-top">
          <Hot />
        </div>
        <div id="right-bottom">
          <Stock />
        </div>
      </section>
    </div>
  </div>
</template>
<script>
import Hot from '@/components/hot.vue'
import Rank from '@/components/Rank.vue'
import Seller from '@/components/seller.vue'
import Map from '@/components/singleMap.vue'
import Stock from '@/components/Stock.vue'
import Trend from '@/components/Trend.vue'

export default {
  name: 'screent',
  components: {
    Hot,
    Rank,
    Seller,
    Map,
    Stock,
    Trend
  }
}
</script>
<style lang="less" scoped>
.fullScreen {
  position: fixed !important;
  top: 0 !important;
  left: 0 !important;
  right: 0 !important;
  bottom: 0 !important;
  margin: 0 auto !important;
  width: 100%;
  height: 100%;
  z-index: 100;
}
.screen-container {
  width: 100%;
  height: 100%;
  padding: 0 20px;
  background: #161522;
  color: #fff;
  box-sizing: border-box;
}
.screen-header {
  width: 100%;
  height: 64px;
  font-size: 20px;
  position: relative;
  > div {
    img {
      width: 100%;
    }
  }
  .title {
    position: absolute;
    left: 50%;
    top: 50%;
    font-size: 20px;
    transform: translate(-50%, -50%);
  }
  .title-right {
    display: flex;
    align-items: center;
    position: absolute;
    right: 0px;
    top: 50%;
    transform: translateY(-80%);
  }
  .qiehuan {
    width: 28px;
    height: 21px;
    cursor: pointer;
  }
  .dataTime {
    font-size: 15px;
    margin-left: 10px;
  }
  .logo {
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-80%);
    img {
      height: 35px;
      width: 128px;
    }
  }
}
.screen-body {
  width: 100%;
  height: 100%;
  display: flex;
  margin-top: 10px;
  .screen-left {
    height: 100%;
    width: 27.6%;
    #left-top {
      height: 53%;
      position: relative;
    }
    #left-bottom {
      height: 31%;
      margin-top: 25px;
      position: relative;
    }
  }
  .screen-middle {
    height: 100%;
    width: 41.5%;
    margin-left: 1.6%;
    margin-right: 1.6%;
    #middle-top {
      width: 100%;
      height: 56%;
      position: relative;
    }
    #middle-bottom {
      margin-top: 25px;
      width: 100%;
      height: 28%;
      position: relative;
    }
  }
  .screen-right {
    height: 100%;
    width: 27.6%;
    #right-top {
      height: 48%;
      position: relative;
    }
    #right-bottom {
      height: 38%;
      margin-top: 25px;
      position: relative;
    }
  }
}
.resize {
  position: absolute;
  right: 20px;
  top: 20px;
  cursor: pointer;
}
</style>
