const IO = require('io-square')
const db = require('redis')

IO.redis = {
  setClient (dbNum = 0, auth = false, password = null) {
    if (auth !== true) {
      const c = db.createClient()
      c.select(dbNum, db.print)
      this.client = c
    } else {
      const c = db.createClient()
      c.auth(password, db.print)
      c.select(dbNum, db.print)
      this.client = c
    }
  },

  get (key) {
    return new IO(cb => this.client.get(key, cb))
                 .map((e, v) => v)
  },

  set (key, val) {
    return new IO(cb => this.client.set(key, val, cb))
                 .map((e, confirmation) => confirmation === 'OK' ? val : e)
  },

  lpush (key, ...values) {
    return new IO(cb => this.client.lpush(key, values, cb))
                 .map((e, n) => values.length === n)
  },

  rpush (key, ...values) {
    return new IO(cb => this.client.rpush(key, values, cb))
                 .map((e, n) => values.length === n)
  },

  lpop (key) {
    return new IO(cb => this.client.lpop(key, cb))
               .map((e, v) => v)
  },

  rpop (key) {
    return new IO(cb => this.client.rpop(key, cb))
               .map((e, v) => v)
  },

  del (...keys) {
    return new IO(cb => this.client.del(keys, cb))
                               .map((e, n) => n)
  },

  exists (...keys) {
    return new IO(cb => this.client.exists(keys, cb))
                 .map((e, n) => keys.length === n) },

  hexists (key, field) {
    return new IO(cb => this.client.hexists(key, field, cb))
                 .map((e, v) => v === 1)
  }

}

module.exports = IO.redis
