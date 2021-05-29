'use strict';
const Service = require('egg').Service;
const md5 = require('md5')
const BaseService =require('./base')
// 操作数据库
class UserService extends BaseService {
  async getUser(username,password) {
    return this.run(async()=>{
      const { ctx,app } = this
      const _where = password?{username,password:md5(password+app.config.salt)}:{username}
      const result = await ctx.model.User.findOne({
        where:_where
      })
      return result;
    })
  }

  async add(params){
    return this.run(async()=>{
      const { ctx } = this
      const result = await ctx.model.User.create(params)
      return result
    })
  }

  async edit(params){
    console.log('params',params)
    return this.run(async (ctx)=>{
      const result = await ctx.model.User.update(params,{
        where:{
          username: ctx.username
        }
      })
      return result
    })
  }
}

module.exports = UserService;
