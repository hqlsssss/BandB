'use strict';
const Controller = require('egg').Controller;
const md5 = require('md5')
const BaseController = require('./base')
class UserController extends BaseController {
  parseResult(ctx,result){
    return {
      ...ctx.helper.unPick(result.dataValues,['password']),
      createTime:ctx.helper.timestamp(result.timestamp),
    }
  }

  async jwtSign(){
    const {ctx,app} = this
    const username = ctx.params('username')
    const token = app.jwt.sign({
      username
    },app.config.jwt.secret)
    // ctx.session[username] = 1
    await app.redis.set(username,token,'EX',app.config.redisExpire)
    return token
  }

  async register(){
    const {ctx, app} = this;
    const params = ctx.params()
    console.log(params.username);
    const user = await ctx.service.user.getUser(params.username)
    if(user){
      this.error('用户已经存在')
      return;
    }
    const result = await ctx.service.user.add({
      ...params,
      password:md5(params.password+app.config.salt),
      createTime:ctx.helper.time()
    })
    console.log(result)
    if(result){
      const token = await this.jwtSign()
      this.success({
        ...this.parseResult(ctx,result),
        token
      })
    }else{
      this.error('注册用户失败')
    }
  }

  async login(){
    const {ctx,app} = this
    const {username,password} = ctx.params();
    const user = await ctx.service.user.getUser(username,password)
    if(user){
      const token = await this.jwtSign()
      this.success({
        ...this.parseResult(ctx,user),
        token
      })
    }else{
      this.error('用户不存在')
    }
  }

  async logout(){
    const {ctx,app} = this
    try {
      await app.redis.del(ctx.username)
      this.success('ok')
    } catch (error) {
      this.error('退出登录失败')
    }
  }

  async detail(){
    const {ctx,app} = this
    const user = await ctx.service.user.getUser(ctx.username)
    if(user){
      this.success({
        ...this.parseResult(ctx,user),
      })
    }else{
      this.error('用户信息不存在')
    }
  }

  async edit(){
    const {ctx,app} = this
    const result = await ctx.service.user.edit({
      ...ctx.params(),
      updateTime:ctx.helper.time()
    })
    console.log('---------------',result)
    this.success(result)
  }
}

module.exports = UserController;

