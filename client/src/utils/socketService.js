/**
 * 约定webscoket的参数
 * {
 *  action: '', // 类型
 *  socketType：‘’, // scoket数据类型
 *  chartName: '', // 数据名称
 *  value: '', // 不是获取数据的状态，一个冗余值
 *  data: '' // 获数据的话，将返回到该字段中
 * }
 */
export default class SocketService {
  /**
   * 单利设计模式
   */
  static instance = null;
  static get Instance() {
    if (!this.instance) {
      this.instance = new SocketService()
    }
    return this.instance
  }
  // 连接服务器代码

  ws = null
  // 存储回调函数
  callBackMapping = {}
  // 是否连接成功
  connectd = false
  // 记录重试次数
  sendRetryCount = 0
  // 记录重新连接的次数
  connectRetryCount = 0
  connect() {
    if (!window.WebSocket) {
      return console.log('您的浏览器不支持websocket')
    }
    this.ws = new WebSocket('ws://localhost:9998')
    // 连接成功
    this.ws.onopen = () => {
      console.log('连接服务端成功')
      this.connectd = true
      this.connectRetryCount = 0
    }
    this.ws.onclose = () => {
      console.log('连接服务端失败')
      this.connectd = false
      setTimeout(() => {
        this.connectRetryCount++
        this.connect()
      }, this.connectRetryCount * 500)
    }
    this.ws.onmessage = msg => {
      console.log('监听发送的数据')
      const recvData = JSON.parse(msg.data)
      const socketType = recvData.socketType
      // 判断回调函数是否存在
      if (this.callBackMapping[socketType]) {
        const action = recvData.action
        console.log(recvData)
        if (action === 'getData') {
          const realData = JSON.parse(recvData.data)
          this.callBackMapping[socketType].call(this, realData)
        } else if (action === 'fullScreen') {

        } else if (action === 'themeChange') {

        }
      }
    }
  }
  // 回调函数的注册

  registerCallBack(scoketType, callBack) {
    this.callBackMapping[scoketType] = callBack
  }

  // 取消回调函数

  unRegisterCallBack(scoketType) {
    this.callBackMapping[scoketType] = null
  }

  // 发送数据的方法
  send(data) {
    if (this.connectd) {
      this.sendRetryCount = 0
      this.ws.send(JSON.stringify(data))
    } else {
      this.sendRetryCount++
      setTimeout(() => {
        this.send(data)
      }, this.sendRetryCount * 500)
    }
  }
}
