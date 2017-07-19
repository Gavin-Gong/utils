'use strict';

// index.js
// 获取应用实例
var app = getApp();
Page({
  data: {
    motto: 'Hello World',
    userInfo: {}
  },
  // 事件处理函数
  bindViewTap: function bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    });
  },
  onLoad: function onLoad() {
    console.log('onLoad');
    wx.$request({ url: 'http://baidu.com' }).then(function (res) {
      console.log(res);
      return res;
    }).catch(function (err) {
      console.log('err', err);
    });
    var that = this;
    // 调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      // track user
      wx.$zhuge.identify(userInfo.nickName, userInfo);
      // console.log(userInfo)
      wx.$zhuge.track('loadPage');
      // 更新数据
      that.setData({
        userInfo: userInfo
      });
    });
  },
  navigateTo: function navigateTo(e) {
    wx.navigateTo({
      url: '/pages/demo/index'
    });
  }
});