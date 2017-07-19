'use strict';

var Wnt = require('../../components/index');

Page(Object.assign({}, Wnt.Switch, {
  data: {
    switch1: {
      disable: true,
      event: 'switch1',
      on: true
    },
    switch2: {
      disable: false,
      event: 'switch2',
      on: false
    },
    checkbox1: {
      checked: true
    },
    checkbox2: {
      checked: false
    }
  },
  onLoad: function onLoad() {
    var _this = this;

    wx.eventBus.addListener('switch1', function (e) {
      console.log('emit switch1', e);
      _this.setData({
        switch1: e
      });
    });
    wx.eventBus.addListener('switch2', function (e) {
      console.log('emit switch2', e);
      _this.setData({
        switch2: e
      });
    });
  },
  onSwitchChange: function onSwitchChange(e) {
    console.log('switch: ' + e);
  },
  fuckTap: function fuckTap(e) {
    console.log('test');
  }
}));