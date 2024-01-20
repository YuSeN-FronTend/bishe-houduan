/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1684734426649_8475';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };
  // 配置跨域
  config.cors = {
    // 允许请求的来源，为*表示允许所有IP请求
    origin: '*',
    // 允许请求的方式
    allowMethods: "GET, HEAD, PUT, POST, DELETE, PATCH",
    credentials: true
  }
  config.security = {
    // 关闭csrf检测
    csrf: {
      enable: false,
    },
    // 配置对象安全性上定义白名单域属性
    domainWhiteList: ["*"]
  }
  // jwt token鉴权配置
  config.jwt = {
    secret: 'ys2001'
  }
  // 配置数据库
  config.mysql = {
    app: true, //是否挂载到app下
    agent: false, // 是否挂载到代理下
    client: { // 连接数据库信息
      host: '127.0.0.1',
      port: '8889',
      user: 'root',
      password: 'root',
      database: 'bishe',
    }
  }
  return {
    ...config,
    ...userConfig,
  };
};
