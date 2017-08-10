'use strict';

Page({
  data: {},
  uploadImg: function uploadImg() {
    // wx.chooseImage({
    //   success (res) {
    //     console.log(res)
    //   }
    // })
    wx.$chooseImage().then(function (res) {
      console.log(res);
      return res.tempFilePaths;
    }).then(function (path) {
      return wx.$uploadFile({
        url: '',
        filePath: Path
      });
    });
  }
});