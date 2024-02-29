"use strict";

const Controller = require("egg").Controller;

class ExpressDeliveryController extends Controller {
  // 首页2023年最受欢迎的快递公司汇总
  async dashboardBarEcharts() {
    const { app, ctx } = this;
    try {
      const barData = await ctx.service.echartsData.dashboardBarEcharts();
      let barObj = {};
      barData.forEach((item) => {
        if (Object.keys(barObj).includes(item.companyName)) {
          barObj[item.companyName]++;
        } else [(barObj[item.companyName] = 1)];
      });
      ctx.body = {
        code: 200,
        msg: "获取成功！",
        data: barObj,
      };
    } catch (error) {
      ctx.body = {
        code: 500,
        msg: "获取失败！（数据库原因）",
        data: null,
      };
    }
  }
  // 获得首页平台年度信息汇总的三个数字
  async dashboardTotalCounts() {
    const { ctx } = this;
    try {
      const totalCounts = await ctx.service.echartsData.dashboardTotalCounts();
      let totalObj = {};
      let totalPrice = 0;
      totalCounts.forEach((item) => {
        totalPrice += item.totalPrice;
        if (Object.keys(totalObj).includes(String(item.user_id))) {
          totalObj[item.user_id]++;
        } else [(totalObj[item.user_id] = 1)];
      });
      ctx.body = {
        code: 200,
        msg: "获取成功！",
        data: {
          totalPrice,
          totalAmount: Object.values(totalObj).reduce(
            (arr, pev) => arr + pev,
            0
          ),
          personCount: Object.keys(totalObj).length,
        },
      };
    } catch (error) {
        console.log(error);
        ctx.body = {
            code: 500,
            msg: "获取失败！（数据库原因）",
            data: null
          };
    }
  }
}

module.exports = ExpressDeliveryController;
