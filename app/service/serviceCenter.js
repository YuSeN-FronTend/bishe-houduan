"use strict";

const Service = require("egg").Service;

class ServiceCenterService extends Service {
  // 发送消息
  async sendMsg(sendData) {
    const { ctx, app } = this;
    const sendInfo = await app.mysql.insert("totalMessage", sendData);
    if (sendInfo?.protocol41) {
      return true;
    } else {
      return false;
    }
  }
  // 获取聊天列表
  async getChatList(user_id) {
    const { ctx, app } = this;
    const sql = `SELECT * FROM totalMessage WHERE sendUserId = ${user_id} OR receiveUserId = ${user_id}`;
    const chatList = await app.mysql.query(sql);
    return chatList;
  }
  // 点击聊天人时获取聊天记录
  async getChatHistory(company_id, user_id) {
    const { ctx, app } = this;
    const sql = `SELECT * FROM totalMessage WHERE (sendUserId = ${company_id} AND receiveUserId = ${user_id}) OR (sendUserId = ${user_id} AND receiveUserId = ${company_id})`;
    const chatInfo = await app.mysql.query(sql);
    return chatInfo;
  }
  // 查看后修改字段isLook
  async changeIsLook(params) {
    const { ctx, app } = this;
    try {
      const users = await app.mysql.select("totalMessage", {
        where: {
          sendUserId: params.sendUserId,
          receiveUserId: params.receiveUserId,
        },
      });
      if (users.length > 0) {
        for (let i = 0; i < users.length; i++) {
          await app.mysql.update(
            "totalMessage",
            { isLook: "1" },
            {
              where: {
                id: users[i].id,
              },
            }
          );
        }
      }
      return true;
    } catch (error) {
      return false;
    }
  }
}

module.exports = ServiceCenterService;
