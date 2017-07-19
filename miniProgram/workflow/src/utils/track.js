
var zhuge = require('../libs/zhuge.mini')
var config = require('../config/index')

zhuge.load(config.zhugeKey, { debug: true })
wx.$zhuge = zhuge
