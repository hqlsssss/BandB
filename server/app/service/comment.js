const Service = require('egg').Service;
const BaseService = require('./base')
class CommentService extends BaseService {
  async add(params) {
    const { ctx } = this;
    return this.run(async (ctx,app)=>{
      console.log('-----------params',params)
      const result = await ctx.model.Comment.create(params)
      console.log('----------------',result)
      return result;
    })
  }

  async lists(params,userId) {
    const { ctx } = this;
    return this.run(async (ctx,app)=>{
      const result = await ctx.model.Comment.findAll({
        where:{
          houseId:params.id,
          userId,
        },
        limit:params.pageSize,
        offset:(params.pageNum - 1)*params.pageSize,
        include:[
          {
            model:app.model.User,
            attributes:['avatar','username']
          }
        ]
      })
      console.log('lists-----------------------------result',result)
      return result;
    })
  }
}

module.exports = CommentService;