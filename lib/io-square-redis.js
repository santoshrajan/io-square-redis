'use strict';

var IO = require('io-square');
var db = require('redis');

IO.redis = {
  setClient: function setClient() {
    var dbNum = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var auth = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var password = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    var port = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 6379;
    var host = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : '127.0.0.1';


    if (auth !== true) {
      var c = db.createClient(port, host);
      c.select(dbNum, db.print);
      this.client = c;
    } else {
      var _c = db.createClient(port, host);
      console.log(_c);
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
  incr: function incr(key) {
    var _this3 = this;

    return new IO(function (cb) {
      return _this3.client.incr(key, cb);
    }).map(function (e, v) {
      return v;
    });
  },
  decr: function decr(key) {
    var _this4 = this;

    return new IO(function (cb) {
      return _this4.client.decr(key, cb);
    }).map(function (e, v) {
      return v;
    });
  },
  append: function append(key, value) {
    var _this5 = this;

    return new IO(function (cb) {
      return _this5.client.append(key, value, cb);
    }).map(function (e, v) {
      return v;
    });
  },
  lpush: function lpush(key) {
    var _this6 = this;

    for (var _len = arguments.length, values = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      values[_key - 1] = arguments[_key];
    }

    return new IO(function (cb) {
      return _this6.client.lpush(key, values, cb);
    }).map(function (e, n) {
      return values.length === n;
    });
  },
  rpush: function rpush(key) {
    var _this7 = this;

    for (var _len2 = arguments.length, values = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      values[_key2 - 1] = arguments[_key2];
    }

    return new IO(function (cb) {
      return _this7.client.rpush(key, values, cb);
    }).map(function (e, n) {
      return values.length === n;
    });
  },
  lpop: function lpop(key) {
    var _this8 = this;

    return new IO(function (cb) {
      return _this8.client.lpop(key, cb);
    }).map(function (e, v) {
      return v;
    });
  },
  rpop: function rpop(key) {
    var _this9 = this;

    return new IO(function (cb) {
      return _this9.client.rpop(key, cb);
    }).map(function (e, v) {
      return v;
    });
  },
  del: function del() {
    var _this10 = this;

    for (var _len3 = arguments.length, keys = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      keys[_key3] = arguments[_key3];
    }

    return new IO(function (cb) {
      return _this10.client.del(keys, cb);
    }).map(function (e, n) {
      return n;
    });
  },
  exists: function exists() {
    var _this11 = this;

    for (var _len4 = arguments.length, keys = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
      keys[_key4] = arguments[_key4];
    }

    return new IO(function (cb) {
      return _this11.client.exists(keys, cb);
    }).map(function (e, n) {
      return keys.length === n;
    });
  },
  hexists: function hexists(key, field) {
    var _this12 = this;

    return new IO(function (cb) {
      return _this12.client.hexists(key, field, cb);
    }).map(function (e, v) {
      return v === 1;
    });
  },
  hget: function hget(key, field) {
    var _this13 = this;

    return new IO(function (cb) {
      return _this13.client.hget(key, field, cb);
    }).map(function (e, v) {
      return v;
    });
  },
  hgetall: function hgetall(key) {
    var _this14 = this;

    return new IO(function (cb) {
      return _this14.client.hgetall(key, cb);
    }).map(function (e, v) {
      return v;
    });
  },
  hdel: function hdel(key, field) {
    var _this15 = this;

    return new IO(function (cb) {
      return _this15.client.hdel(key, field, cb);
    }).map(function (e, v) {
      return v;
    });
  },
  hmset: function hmset() {
    var _this16 = this;

    for (var _len5 = arguments.length, args = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
      args[_key5] = arguments[_key5];
    }

    return new IO(function (cb) {
      return _this16.client.hmset(args, cb);
    }).map(function (e, v) {
      return v;
    });
  },
  hmget: function hmget() {
    var _this17 = this;

    for (var _len6 = arguments.length, args = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
      args[_key6] = arguments[_key6];
    }

    return new IO(function (cb) {
      return _this17.client.hmget(args, cb);
    }).map(function (e, v) {
      return [v];
    });
  },
  lrange: function lrange() {
    var _this18 = this;

    for (var _len7 = arguments.length, args = Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
      args[_key7] = arguments[_key7];
    }

    return new IO(function (cb) {
      return _this18.client.lrange(args, cb);
    }).map(function (e, v) {
      return [v];
    });
  },
  lrem: function lrem() {
    var _this19 = this;

    for (var _len8 = arguments.length, args = Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
      args[_key8] = arguments[_key8];
    }

    return new IO(function (cb) {
      return _this19.client.lrem(args, cb);
    }).map(function (e, v) {
      return v;
    });
  },
  lset: function lset() {
    var _this20 = this;

    for (var _len9 = arguments.length, args = Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
      args[_key9] = arguments[_key9];
    }

    return new IO(function (cb) {
      return _this20.client.lset(args, cb);
    }).map(function (e, v) {
      return v;
    });
  },
  sadd: function sadd(key) {
    var _this21 = this;

    for (var _len10 = arguments.length, field = Array(_len10 > 1 ? _len10 - 1 : 0), _key10 = 1; _key10 < _len10; _key10++) {
      field[_key10 - 1] = arguments[_key10];
    }

    return new IO(function (cb) {
      return _this21.client.sadd(key, field, cb);
    }).map(function (e, v) {
      return v;
    });
  },
  smembers: function smembers(key) {
    var _this22 = this;

    return new IO(function (cb) {
      return _this22.client.smembers(key, cb);
    }).map(function (e, v) {
      return [v];
    });
  }
};

module.exports = IO;