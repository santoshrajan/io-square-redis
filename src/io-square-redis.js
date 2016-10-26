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

  hget (key, feild) {
    return new IO(cb => this.client.hget(key, feild, cb))
      .map((e, v) => v)
  },
  hgetall (key) {
    return new IO(cb => this.client.hgetall(key, cb))
      .map((e, v) => v)
  },

  hdel (key, feild) {
    return new IO(cb => this.client.hdel(key, feild, cb))
      .map((e, v) => v)
  }
}

// set password in redis.conf line 396
IO.redis.setClient(0)

IO.redis.get('geekskool')
  .error(err => console.log('error', err))
  .then((a) => {
    console.log(a)
  })

IO.redis.hget('myhash', 'field1')
  .error(err => console.log('error', err))
  .then((a) => {
    console.log(a)
  })
IO.redis.hgetall('myhash')
  .error(err => console.log('error', err))
  .then((a) => {
    console.log(a)
  })

IO.redis.hdel('myhash', 'field1')
  .error(err => console.log('error', err))
  .then((a) => {
    console.log(a)
  })
