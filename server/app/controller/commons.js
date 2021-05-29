const Controller = require('egg').Controller;
const BaseController = require('./base')
class CommonsController extends BaseController {
  async citys() {
    const { ctx, app } = this;
    const citys = [
      [
        { label: '杭州', value: '10001' },
        { label: '苏州', value: '10002' },
        { label: '上海', value: '10003' },
        { label: '绍兴', value: '10004' },
      ]
    ]
    try {
      // const result = await app.httpclient.request('https://apis.imooc.com/?icode=89773B5DA84CA283', {
      //   dataType: 'json'
      // })
      // console.log(result)
      // if (result.status === 200 && result) {
      //   this.success(result.data.citys)
      // } else {
      //   this.error('获取城市数据失败')
      // }
      this.success(citys)
    } catch (error) {
      this.error('获取城市数据失败')
    }
  }
}

module.exports = CommonsController;