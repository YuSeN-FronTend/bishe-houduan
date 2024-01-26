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
    const { type, phone, currentPage, pageSize } = params;
    let page = currentPage || 1;
    let limit = pageSize || 5;
    // 计算分页偏移量
    const offset = (page - 1) * limit;
    try {
      const countSql = `SELECT COUNT(*) AS total FROM expressDelivery WHERE ${type} = ?`;
      const listSql = `SELECT * FROM expressDelivery WHERE ${type} = ? LIMIT ?, ?`;
      const [countResult, list] = await Promise.all([
        app.mysql.query(countSql, [phone]),
        app.mysql.query(listSql, [phone, offset, limit])
      ])
      return {
        total: countResult[0].total,
        list
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  // 运单评分
  async setRate(params) {
    console.log(params);
    const { id, rate } = params;
    try {
      const result = await this.app.mysql.update(
        "expressDelivery",
        {
          rate,
        },
        {
          where: {
            id,
          },
        }
      );
      if (result) {
        return result;
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  // 删除订单
  async deleteWaybill(id) {
    try {
      const result = await this.app.mysql.delete("expressDelivery", { id });
      if (result) {
        return result;
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  // 根据订单号查询订单
  async trackOrder(trackNumber) {
    const { ctx, app } = this;
    try {
      const orderInfo = await app.mysql.select('expressDelivery', {
        where: {
          trackNumber
        }
      })
      if(orderInfo) {
        return orderInfo;
      }
    } catch (error) {
      console.log(error);
      return null;
    }
}
}

module.exports = ExpressDeliveryService;
