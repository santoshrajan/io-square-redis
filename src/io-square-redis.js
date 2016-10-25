const IO = require('io-square')
const db = require('redis')

IO.redis = {
  setClient (dbNum = 0, auth = false, password = null){
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
                  .map((e,v) => v)
  },
  
}

IO.redis.setClient(0, true, 'TESTpassWord123')

IO.redis.get('geekskool')
  .error(err => console.log('error', err))
  .then((a)=> {
      console.log(a)
      // console.log(val)
  })
