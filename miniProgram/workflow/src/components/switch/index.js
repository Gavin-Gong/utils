const Switch = {
  _handleWntSwitch (e) {
    const dataset = e.currentTarget.dataset
    // console.log(dataset)
    wx.eventBus.emitEvent(dataset.event, [Object.assign({}, dataset, {
      on: dataset.disable ? dataset.on : !dataset.on
    })])
    // this.setData({
    //   switch: { disabled: !this.data.switch.disabled }
    // })
  }
}

module.exports = Switch
