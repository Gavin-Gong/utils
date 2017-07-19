const Promise = require('../libs/bluebird.core.min')

// NoPromise List

let noPromiseMethods = {
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
}

Object.keys(wx).forEach(key => {
  if (typeof wx[key] === 'function' && !noPromiseMethods[key] && key.substr(0, 2) !== 'on' && !(/\w+Sync$/.test(key))) {
    wx[`$${key}`] = (obj) => {
      return new Promise((resolve, reject) => {
        wx[key](Object.assign({}, obj, {
          success (res) {
            resolve(res)
          },
          fail (res) {
            reject(res)
          },
          complete (res) {
            // TODO:// fix this feature
          }
        }))
      })
    }
  }
})
