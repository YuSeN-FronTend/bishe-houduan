'use strict';

const Service = require('egg').Service;

class HomeService extends Service {
  async getData(data) {
    const { ctx, app } = this;
      const userInfo = app.mysql.insert('girl', data)
      return userInfo
  }
}

module.exports = HomeService;
