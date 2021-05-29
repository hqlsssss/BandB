module.exports= options =>{
  console.log(options)
  return async (ctx,next)=>{
    const url = ctx.request.url
    console.log('url',url);
    // const user = ctx.session[ctx.username]
    const token = ctx.request.token
    const username = await ctx.app.redis.get(ctx.username)
    // 缓存验证用户是否存在
    const user = username ? username === token:username
    if(!user && !options.exclude.includes(ctx.request.url.split('?')[0])){
      ctx.body = {
        status:1001,
        errMsg:'用户未登录'
      }
    }else{
      await next()
    }
  }
}