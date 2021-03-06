"use strict";

var _ = {};(function () {
  var a = Array.prototype,
      b = Object.prototype,
      f = a.slice,
      d = b.hasOwnProperty,
      c = a.forEach,
      e = {};_.uuid = function () {
    function g() {
      return Math.floor((1 + Math.random()) * 65536).toString(16).substring(1);
    }return g() + g() + "-" + g() + "-" + g() + "-" + g() + "-" + g() + g() + g();
  };_.each = function (n, m, k) {
    if (n == null) {
      return;
    }if (c && n.forEach === c) {
      n.forEach(m, k);
    } else {
      if (n.length === +n.length) {
        for (var j = 0, g = n.length; j < g; j++) {
          if (j in n && m.call(k, n[j], j, n) === e) {
            return;
          }
        }
      } else {
        for (var h in n) {
          if (d.call(n, h)) {
            if (m.call(k, n[h], h, n) === e) {
              return;
            }
          }
        }
      }
    }
  };_.extend = function (g) {
    _.each(f.call(arguments, 1), function (h) {
      for (var i in h) {
        if (h[i] !== void 0) {
          g[i] = h[i];
        }
      }
    });return g;
  };_.isUndefined = function (g) {
    return g === void 0;
  };_.isString = function (g) {
    return Object.prototype.toString.call(g) == "[object String]";
  };_.isArray = function (g) {
    return Object.prototype.toString.call(g) === "[object Array]";
  };_.isFunction = function (h) {
    try {
      return (/^\s*\bfunction\b/.test(h)
      );
    } catch (g) {
      return false;
    }
  };_.isObject = function (g) {
    return g === Object(g) && !_.isArray(g);
  };_.getSystemInfo = function () {
    var g = wx.getSystemInfoSync();g.version = "wx " + g.version;g.resolution = g.windowWidth + "x" + g.windowHeight;return g;
  };
})();_.getNet = function (a) {
  wx.getNetworkType({ complete: function complete(c) {
      var e = c.networkType === "wifi" ? 1 : 0,
          d = { "2g": 1, "3g": 3, "4g": 13 },
          b = c.networkType === "wifi" ? 0 : d[c.networkType];storage.set("net", e);storage.set("mnet", b);if (a) {
        a({ net: e, mnet: b });
      }
    } });
};var storage = { key: "zg" };storage.get = function (a) {
  var b = this.getAll();return b ? b[a] : null;
};storage.set = function (a, c) {
  var b = this.getAll();b[a] = c;wx.setStorageSync(this.key, b);
};storage.del = function (a) {
  var b = this.getAll();delete b[a];wx.setStorageSync(this.key, b);
};storage.getAll = function () {
  var a = wx.getStorageSync(this.key);if (!a) {
    a = { cache: [], ec: 0, net: 0, mnet: 0 };wx.setStorageSync(this.key, a);
  }return a;
};storage.clear = function () {
  wx.removeStorageSync(this.key);
};storage.getDid = function () {
  return wx.getStorageSync("zg-did");
};storage.registerDid = function () {
  wx.setStorageSync("zg-did", _.uuid());
};storage.flush = function () {
  var b = this.get("sid"),
      c = this.get("cache");for (var d = 0, a = c.length; d < a; d++) {
    var e = c[d];if (e.hasOwnProperty("sid")) {
      e.sid = b;
    }
  }this.set("cache", []);return c;
};var ZGTracker = function ZGTracker() {
  this._props = { appKey: "", br: "wx-app", an: "", vn: "", cn: "wx-app" };this._url = { normal: "https://apipool.zhugeio.com/web_event", bac: "https://apipool.zhugeio.com/web_event" };this._config = { debug: false, an: "wxApp", vn: "1.0" };this._sdk = "web";this._sdkv = "1.0";
};ZGTracker.prototype._registerOnce = function () {
  var a = storage.getDid();if (!a) {
    storage.registerDid();
  }
};ZGTracker.prototype._sendRequest = function (b) {
  var c = new Date().getTime() / 1000;var d = { method: "web_event_srv.upload", event: { ak: this._props.appKey, sdkv: this._sdkv, sdk: this._sdk, srcsdk: "wx", did: storage.getDid(), cn: this._props.cn, vn: this._props.vn, cuid: storage.get("cuid"), debug: this._config.debug ? 1 : 0, ts: c, type: "statis", data: [] }, _: new Date().getTime().toString() };var a = storage.get("cache");if (!storage.get("sid")) {
    a.push(b);storage.set("cache", a);
  } else {
    if (a.length) {
      d.event.data.push(storage.flush());
    }d.event.data.push(b);this._request(d);
  }
};ZGTracker.prototype._request = function (b) {
  var a = this;wx.request({ url: this._url.normal, data: b, fail: function fail() {
      wx.request({ url: a._url.bac, data: b });
    } });
};ZGTracker.prototype._info = function () {
  var a = _.getSystemInfo();var b = { et: "info", pr: { br: this._props.br, dv: a.model, rs: a.resolution } };this._sendRequest(b);
};ZGTracker.prototype._sessionStart = function () {
  var b = new Date().getTime() / 1000,
      a = _.getSystemInfo(),
      c = this;storage.set("sid", b);storage.set("beginTime", b);var d = { et: "ss", an: c._props.an, vn: c._props.vn, sid: b, cn: c._props.cn, pr: { br: c._props.br, rs: a.resolution, dv: a.model } };c._sendRequest(d);
};ZGTracker.prototype._sessionEnd = function () {
  var a = storage.get("sid"),
      b = new Date().getTime() / 1000,
      d = b - storage.get("beginTime");var c = { et: "se", dr: d.toFixed(3), sid: a };this._sendRequest(c);storage.clear();
};ZGTracker.prototype._init = function () {
  this._registerOnce();this._sessionStart();this._info();
};ZGTracker.prototype.load = function (b, a) {
  this._props.appKey = b;storage.set("appKey", b);if (_.isObject(a)) {
    this._config = _.extend(this._config, a);if (this._config.an) {
      this._props.an = this._config.an;
    }if (this._config.vn) {
      this._props.vn = this._config.vn;
    }
  }
};ZGTracker.prototype.identify = function (b, c) {
  var a = storage.get("sid");storage.set("cuid", b);var d = { et: "idf", cuid: b, pr: {}, sid: a };if (_.isObject(c)) {
    d.pr = c;
  }this._sendRequest(d);
};ZGTracker.prototype.track = function (b, c) {
  var a = storage.get("sid");storage.set("ec", storage.get("ec") + 1);var d = { et: "cus", eid: b, pr: {}, ts: new Date().getTime() / 1000, sid: a };if (_.isObject(c)) {
    d.pr = c;
  }this._sendRequest(d);
};ZGTracker.prototype.start = function () {
  this._init();
};ZGTracker.prototype.end = function () {
  this._sessionEnd();
};module.exports = new ZGTracker();