Page({
  data: {
  },
  uploadImg () {
    // wx.chooseImage({
    //   success (res) {
    //     console.log(res)
    //   }
    // })
    wx.$chooseImage().then(res => {
      console.log(res)
      return res.tempFilePaths
    }).then(path => {
      return wx.$uploadFile({
        url: '',
        filePath: Path
      })

    })
  }
})
