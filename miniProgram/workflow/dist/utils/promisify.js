'use strict';

var Promise = require('../libs/bluebird.core.min');

// NoPromise List

var noPromiseMethods = {
  stopRecord: true,
  pauseVoice: true,
  stopVoice: true,
  pauseBackgroundAudio: true,
  stopBackgroundAudio: true,
  showNavigationBarLoading: true,
  hideNavigationBarLoading: true,
  createAnimation: true,
  createContext: true,
  createCanvasContext: true,
  hideKeyboard: true,
  stopPullDownRefresh: true
};

Object.keys(wx).forEach(function (key) {
  if (typeof wx[key] === 'function' && !noPromiseMethods[key] && key.substr(0, 2) !== 'on' && !/\w+Sync$/.test(key)) {
    wx['$' + key] = function (obj) {
      return new Promise(function (resolve, reject) {
        wx[key](Object.assign({}, obj, {
          success: function success(res) {
            resolve(res);
          },
          fail: function fail(res) {
            reject(res);
          },
          complete: function complete(res) {
            // TODO:// fix this feature
          }
        }));
      });
    };
  }
});