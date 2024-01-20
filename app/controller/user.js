"use strict";

const Controller = require("egg").Controller;
const qrcode = require('qrcode');
const { adminRoute, personRoute } = require("../public/routeData");
class UserController extends Controller {
  async login() {
    const { ctx, app } = this;
    try {
      const { username, password } = ctx.request.body;
      if (!username || !password) {
        ctx.body = {
          code: 500,
          msg: "账号或密码为空",
          data: null,
        };
        return;
      }
      // 根据用户名在数据库查找相对应的操作
      const userInfo = await ctx.service.user.login(username);
      console.log(userInfo);
      // 没找到说明没有该用户
      if (!userInfo || !userInfo.id) {
        ctx.body = {
          code: 500,
          msg: "账号不存在",
          data: null,
        };
        return;
      }
      // 2.找到用户，并且判断输入密码与数据库中用户密码
      if (userInfo && password !== userInfo.password) {
        ctx.body = {
          code: 500,
          msg: "账号或密码错误",
          data: "null",
        };
        return;
      } else {
        const token = app.jwt.sign(
          {
            id: userInfo.id,
            username: userInfo.username,
            exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60, // token有效期为24小时
          },
          app.config.jwt.secret
        );
        delete userInfo.password;
        if(userInfo.location) {
          userInfo.location = JSON.parse(userInfo.location);
        }
        // 返回token
        if (userInfo.job === '企业') {
          ctx.body = {
            code: 200,
            msg: '登陆成功!',
            data: {
              token,
              routeInfo: adminRoute,
              userInfo
            }
          }
        } else if(userInfo.job === '用户') {
          ctx.body = {
            code: 200,
            msg: '登陆成功!',
            data: {
              token,
              routeInfo: personRoute,
              userInfo
            }
          }
        }
      }
    } catch (error) {
      ctx.body = {
        code: 500,
        msg: "登陆失败",
        data: null,
      };
    }
  }
  async register() {
    const { ctx, app } = this;
    console.log(ctx.request.body);
    try {
      const { username, password, job, name } = ctx.request.body;
      if (!username || !password || !job) {
        ctx.body = {
          code: 500,
          msg: "信息不可以为空",
          data: null,
        };
        return;
      }
      const userInfo = await ctx.service.user.getUserByName(username);
      if (userInfo && userInfo.id) {
        ctx.body = {
          code: 500,
          msg: "用户名已被注册, 请重新输入",
          data: null,
        };
        return;
      }
      let result = await ctx.service.user.register({
        password,
        username,
        name,
        job,
      });
      if (result) {
        ctx.body = {
          code: 200,
          msg: "注册成功，请登录！",
          data: null,
        };
      } else {
        ctx.body = {
          code: 500,
          msg: "注册失败",
          data: null,
        };
      }
    } catch (error) {
      ctx.body = {
        code: 500,
        msg: "注册失败",
        data: null,
      };
    }
  }
  async changeUserInfo() {
    const { ctx, app } = this;
    ctx.request.body.location = JSON.stringify(ctx.request.body.location);
    const accountInfo = await ctx.service.user.changeUserInfo(ctx.request.body);
    if(accountInfo.id) {
      accountInfo.location = JSON.parse(accountInfo.location);
      ctx.body = {
        code: 200,
        msg: '更新成功！',
        accountInfo
      }
    } else {
      ctx.body = {
        code: 500,
        msg: accountInfo,
        data: null
      }
    }
  }
}

module.exports = UserController;
