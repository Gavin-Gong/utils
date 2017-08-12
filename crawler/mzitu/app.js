const Rx = require('rxjs')
const cheerio = require('cheerio')
const charset = require('superagent-charset')
const superagent = charset(require('superagent'))

// superagent.get(url).charset('gbk').then(...) // 指定编码

superagent.get('http://mzitu.com')
  .charset('utf-8')
  .then(res => {
    console.log(res.text)
    let $ = cheerio.load(res.text, {decodeEntities: false})
  })
