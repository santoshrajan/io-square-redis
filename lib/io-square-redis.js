'use strict';

var IO = require('io-square');
var db = require('redis');

IO.redis = {
  setClient: function setClient() {
    var dbNum = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var auth = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var password = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

    if (auth !== true) {
      var c = db.createClient();
      c.select(dbNum, db.print);
      this.client = c;
    } else {
      var _c = db.createClient();
      _c.auth(password, db.print);
      _c.select(dbNum, db.print);
      this.client = _c;
    }
  },
  get: function get(key) {
    var _this = this;

    return new IO(function (cb) {
      return _this.client.get(key, cb);
    }).map(function (e, v) {
      return v;
    });
  },
  set: function set(key, val) {
    var _this2 = this;

    return new IO(function (cb) {
      return _this2.client.set(key, val, cb);
    }).map(function (e, confirmation) {
      return confirmation === 'OK' ? val : e;
    });
  },
  lpush: function lpush(key) {
    var _this3 = this;

    for (var _len = arguments.length, values = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      values[_key - 1] = arguments[_key];
    }

    return new IO(function (cb) {
      return _this3.client.lpush(key, values, cb);
    }).map(function (e, n) {
      return values.length === n;
    });
  },
  rpush: function rpush(key) {
    var _this4 = this;

    for (var _len2 = arguments.length, values = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      values[_key2 - 1] = arguments[_key2];
    }

    return new IO(function (cb) {
      return _this4.client.rpush(key, values, cb);
    }).map(function (e, n) {
      return values.length === n;
    });
  },
  lpop: function lpop(key) {
    var _this5 = this;

    return new IO(function (cb) {
      return _this5.client.lpop(key, cb);
    }).map(function (e, v) {
      return v;
    });
  },
  rpop: function rpop(key) {
    var _this6 = this;

    return new IO(function (cb) {
      return _this6.client.rpop(key, cb);
    }).map(function (e, v) {
      return v;
    });
  },
  del: function del() {
    var _this7 = this;

    for (var _len3 = arguments.length, keys = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      keys[_key3] = arguments[_key3];
    }

    return new IO(function (cb) {
      return _this7.client.del(keys, cb);
    }).map(function (e, n) {
      return n;
    });
  },
  exists: function exists() {
    var _this8 = this;

    for (var _len4 = arguments.length, keys = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
      keys[_key4] = arguments[_key4];
    }

    return new IO(function (cb) {
      return _this8.client.exists(keys, cb);
    }).map(function (e, n) {
      return keys.length === n;
    });
  },
  hexists: function hexists(key, field) {
    var _this9 = this;

    return new IO(function (cb) {
      return _this9.client.hexists(key, field, cb);
    }).map(function (e, v) {
      return v === 1;
    });
  }
};

module.exports = IO.redis;
