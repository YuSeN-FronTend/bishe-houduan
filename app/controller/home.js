'use strict';

const { Controller } = require('egg');

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, egg';
  }
  async getData() {
    const { ctx }  = this;
    try{
      const result = ctx.service.home.getData(ctx.request.body);
      if (result) {
        ctx.body = {
          code: 200,
          msg: '添加成功',
          data: null
        }
        return
      }
    }catch(error) {
      console.log(error);
      return
    }
  }
}

module.exports = HomeController;
