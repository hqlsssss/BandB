module.exports = options =>{
  return async (ctx,next)=>{
    // 数据库验证用户是否存在
    const user = await ctx.service.user.getUser(ctx.username)
    if(!user){
      ctx.body = {
        status:500,
        errMsg:'用户不存在'
      }
      return
    }else{
      await next()
    }
  }
}