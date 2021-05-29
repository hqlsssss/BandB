
module.exports = app=>{
  const store = {}
  app.sessionStore={
    async get(key){
      console.log(store)
      return store[key]
    },
    async set(key,value,maxAge){
      store[key] = value
    },
    async destroy(key){
      store[key] = null
    }
  }
  //插件有顺序要求
  app.config.coreMiddleware.push('notFound')
  app.config.coreMiddleware.push('auth')
  
}