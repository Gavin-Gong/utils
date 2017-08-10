'use strict';

var EventEmitter = require('./libs/EventEmitter.min');
require('./utils/promisify');
require('./libs/bluebird.core.min');
require('./utils/track');

var eventBus = new EventEmitter();
wx.eventBus = eventBus;
// app.js
App({
  onLaunch: function onLaunch() {
    // 调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || [];
    logs.unshift(Date.now());
    wx.setStorageSync('logs', logs);
    this.login();
  },
  onShow: function onShow() {
    // start track
    wx.$zhuge.start();
  },
  onHide: function onHide() {
    // stop track
    wx.$zhuge.end();
  },
  getUserInfo: function getUserInfo(cb) {
    var that = this;
    if (this.globalData.userInfo) {
      typeof cb === 'function' && cb(this.globalData.userInfo);
    } else {
      // 调用登录接口
      wx.getUserInfo({
        withCredentials: false,
        success: function success(res) {
          that.globalData.userInfo = res.userInfo;
          typeof cb === 'function' && cb(that.globalData.userInfo);
        }
      });
    }
  },
  login: function login() {
    wx.$checkSession().then(function (res) {
      console.log('is login');
    });

    wx.checkSession({
      success: function success() {
        console.log('is login');
      },
      fail: function fail(err) {
        console.log(err);
        wx.login({
          success: function success(res) {
            console.log(res);
          },
          fail: function fail(err) {
            console.log(err);
          }
        });
      }
    });
  },

  globalData: {
    userInfo: null
  }
});