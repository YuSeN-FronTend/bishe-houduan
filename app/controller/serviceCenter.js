"use strict";

const Controller = require("egg").Controller;

class serviceCenterController extends Controller {
  // 发送消息
  async sendMsg() {
    const { ctx, app } = this;
    try {
      const msgInfo = await ctx.service.serviceCenter.sendMsg(ctx.request.body);
      if (msgInfo) {
        const chatInfo = await ctx.service.serviceCenter.getChatHistory(ctx.request.body.sendUserId, ctx.request.body.receiveUserId);
        ctx.body = {
          code: 200,
          msg: "发送成功！",
          data: chatInfo,
        };
      } else {
        ctx.body = {
          code: 500,
          msg: "数据库出错！",
          data: null,
        };
      }
    } catch (error) {
      ctx.body = {
        code: 500,
        msg: "数据库出错！",
        data: null,
      };
    }
  }
  // 获取聊天列表
  async getChatList() {
    const { ctx, app } = this;
    try {
    const user_id = ctx.query.user_id;
    const chatList = await ctx.service.serviceCenter.getChatList(user_id);
    let chatArr = []
    let chatObj = {}
    chatList.forEach(item => {
      if(item.receiveUserId == user_id) {
        chatArr.push(item);
      }
    })
    chatArr.forEach(item => {
      if(Object.keys(chatObj).includes(item.sendName)) {
        if(item.isLook == 0) {
          chatObj[item.sendName]++;
        }
      } else {
        if(item.isLook == 0) {
          chatObj[item.sendName] = 1;
        }
      }
    })
    const list = [];
    function math(id, name, time, message) {
        if (list.length === 0) {
            list.push({
              id: id,
              name: name,
              time: time,
              message: message,
              user_id: user_id,
            });
          } else {
            for (let i = 0; i < list.length; i++) {
              if (list[i].id == id) {
                if (Number(list[i].time) <= Number(time)) {
                  list.splice(i, 1, {
                    id: id,
                    name: name,
                    time: time,
                    message: message,
                    user_id: user_id,
                  });
                }
                break;
              }
              if (i === list.length - 1) {
                list.push({
                  id: id,
                  name: name,
                  time: time,
                  message: message,
                  user_id: user_id,
                });
              }
            }
          }
    }
    chatList.forEach((item) => {
      if (item.sendUserId == ctx.query.user_id) {
        math(item.receiveUserId, item.receiveName, item.msgTime, item.sendMsg)
      } else if (item.receiveUserId == ctx.query.user_id) {
        math(item.sendUserId, item.sendName, item.msgTime, item.sendMsg)
      }
    });
    for(let item1 of Object.keys(chatObj)) {
      for(let i = 0; i < list.length; i++) {
        if(item1 === list[i].name) {
          list[i].count = chatObj[item1];
          break;
        }
      }
    }
    list.sort((a,b) => Number(b.time) - Number(a.time));
    ctx.body = {
        code: 200, 
        msg: '获取成功！',
        data: list
    }
    } catch (error) {
        ctx.body = {
            code: 500, 
            msg: '数据库出错！',
            data: null
        }    
    }
    
  }
  // 点击聊天人时获取聊天记录
  async getChatHistory() {
    const { ctx, app } = this;
    const { company_id, user_id } = ctx.request.body;
    try {
      const chatInfo = await ctx.service.serviceCenter.getChatHistory(company_id, Number(user_id));
      ctx.body = {
        code: 200,
        msg: '获取成功！',
        data: chatInfo
      }
    } catch (error) {
      ctx.body = {
        code: 500,
        msg: '数据库出错！',
        data: null
      }
    }
  }
  // 查看后修改字段isLook
  async changeIsLook() {
    const { ctx, app } = this;
    const isLook = await ctx.service.serviceCenter.changeIsLook(ctx.request.body);
    if(isLook) {
      ctx.body = {
        code:200,
        msg: '获取成功！',
        data: null
      }
    } else {
      ctx.body = {
        code: 500,
        msg: '数据库出错！',
        data: null
      }
    }
  }
}

module.exports = serviceCenterController;
