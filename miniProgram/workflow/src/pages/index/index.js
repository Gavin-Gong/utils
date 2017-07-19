// index.js
// 获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {}
  },
  // 事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    console.log('onLoad')
    wx.$request({url: 'http://baidu.com'}).then(res => {
      console.log(res)
      return res
    }).catch(err => {
      console.log('err', err)
    })
    var that = this
    // 调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      // track user
      wx.$zhuge.identify(userInfo.nickName, userInfo)
      // console.log(userInfo)
      wx.$zhuge.track('loadPage')
      // 更新数据
      that.setData({
        userInfo: userInfo
      })
    })
  },
  navigateTo (e) {
    wx.navigateTo({
      url: '/pages/demo/index'
    })
  }
})
