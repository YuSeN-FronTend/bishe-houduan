"use strict";

const Service = require("egg").Service;

class EchartsDataService extends Service {
  // 首页2023年最受欢迎的快递公司汇总
  async dashboardBarEcharts() {
    const { app } = this;
    const barData = await app.mysql.select("expressDelivery", {
      columns: ["companyName"],
    });
    return barData;
  }
  // 获得首页平台年度信息汇总的三个数字
  async dashboardTotalCounts() {
    const { app } = this;
    const totalCounts = await app.mysql.select("expressDelivery", {
      columns: ["totalPrice", "user_id"],
    });
    return totalCounts;
  }
  // 获取近6个月销售金额统计
  async saleAmountCount() {
    const { app } = this;
    const saleData = await app.mysql.select("expressDelivery", {
      columns: ['companyName', "totalPrice", "orderDate"],
      where: {
        companyName: ['顺丰','京东', '中国邮政']
      }
    });
    return saleData;
  }
  // 获取物品种类
  async goodsNameClassify() {
    const { app } = this;
    const goodsCount = await app.mysql.select("expressDelivery", {
      columns: ['goodsName'],
    });
    return goodsCount;
  }
}

module.exports = EchartsDataService;
