const Controller = require('egg').Controller;
const BaseController = require('./base');

class OrdersController extends BaseController {
  async hasOrder() {
    const { ctx, app } = this;
    const user = await ctx.service.user.getUser(ctx.username)
    const result = await ctx.service.orders.hasOrder({
      userId: user.id,
      houseId: ctx.params('id')
    });

    this.success(result);
  }

  async addOrder() {
    const { ctx, app } = this;
    const user = await ctx.service.user.getUser(ctx.username)
    const result = await ctx.service.orders.addOrder({
      userId: user.id,
      houseId: ctx.params('id'),
      isPayed: 0,
      createTime: ctx.helper.time()
    });
    this.success(result);
  }

  async delOrder() {
    const { ctx} = this;
    const user = await ctx.service.user.getUser(ctx.username)
    const result = await ctx.service.orders.delOrder({
      userId: user.id,
      houseId: ctx.params('id'),
    })
    this.success(result)
  }

  async lists(){
    const { ctx} = this;
    const user = await ctx.service.user.getUser(ctx.username)
    const result = await ctx.service.orders.lists({
      ...ctx.params(),
      userId: user.id,
    })
    this.success(result)
  }
}
module.exports = OrdersController;``