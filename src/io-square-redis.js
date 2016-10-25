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
    return new IO(cb => {
      this.client.get(key, (err, reply)=>{
       cb(reply)
    })
  })
}
}

IO.redis.setClient(0, true, 'enterPasswordhere')

IO.redis.get('job')
  .then((val)=> {
    console.log(val)
  })
