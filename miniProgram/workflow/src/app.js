const EventEmitter = require('./libs/EventEmitter.min')
require('./utils/promisify')
require('./libs/bluebird.core.min')
require('./utils/track')

const eventBus = new EventEmitter()
wx.eventBus = eventBus
// app.js
App({
  onLaunch () {
    // 调用API从本地缓存中获取数据
    let logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  onShow () {
    // start track
    wx.$zhuge.start()
  },
  onHide () {
    // stop track
    wx.$zhuge.end()
  },
  getUserInfo (cb) {
    let that = this
    if (this.globalData.userInfo) {
      typeof cb === 'function' && cb(this.globalData.userInfo)
    } else {
      // 调用登录接口
      wx.getUserInfo({
        withCredentials: false,
        success (res) {
          that.globalData.userInfo = res.userInfo
          typeof cb === 'function' && cb(that.globalData.userInfo)
        }
      })
    }
  },
  globalData: {
    userInfo: null
  }
})
