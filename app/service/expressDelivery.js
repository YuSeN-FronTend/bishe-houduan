"use strict";

const Service = require("egg").Service;

class ExpressDeliveryService extends Service {
  // 获取所有的企业
  async getAllCompany() {
    const { ctx, app } = this;
    try {
      const companyInfo = await app.mysql.query(
        "SELECT * FROM user where job = '企业'"
      );
      return companyInfo;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  // 寄快递存表
  async sendExpressDelivery(edInfo) {
    const { ctx, app } = this;
    try {
      const sendInfo = await app.mysql.insert("expressDelivery", edInfo);
      return sendInfo;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  // 运单查询
  async searchWaybill(params) {
    const { ctx, app } = this;
    try {
      const waybillInfo = await app.mysql.query(
        `SELECT * FROM expressDelivery WHERE ${params.type}='${params.phone}'`
      );
      return waybillInfo;
    } catch (error) {
       console.log(error);
       return null;
    }
  }
}

module.exports = ExpressDeliveryService;
