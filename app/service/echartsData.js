'use strict';

const Service = require('egg').Service;

class UserService extends Service {
    async dashboardBarEcharts() {
        const { app } = this;
        const barData = await app.mysql.select('expressDelivery', {
            columns: ['companyName']
          });
        return barData;
    }
    // 获得首页平台年度信息汇总的三个数字
    async dashboardTotalCounts() {
        const { app } = this;
        const totalCounts = await app.mysql.select('expressDelivery', {
            columns: ['totalPrice', 'user_id']
          });
        return totalCounts;
    }
}

module.exports = UserService;
