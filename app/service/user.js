'use strict';

const Service = require('egg').Service;

class UserService extends Service {
  async login(username) {
    const { ctx, app } = this;
    const userInfo = await app.mysql.get('user', { username });
    
    return userInfo
  }
  async getUserByName(username) {
    try {
      const result = await this.app.mysql.get('user', { username })
      return result;
    } catch(error) {
      console.log(error);
      return null;
    }
  }
  async register(registerInfo) {
    try{
      const result = await this.app.mysql.insert('user', registerInfo);
      return result
    } catch(error) {
      console.log(error);
      return null
    }
  }
  async changeUserInfo(userInfo) {
    const { id, name, birthday, location, phone } = userInfo;
    try {
      const result = await this.app.mysql.update('user', {
        name,
        birthday,
        location,
        phone
      }, {
        where: {
          id,
        }
      })
      if(result) {
        const accountInfo = await this.app.mysql.get('user', { id })
        return accountInfo;
      }
    } catch (error) {
      console.log(error);
      return '用户名已存在，请重新输入！';
    }
  }
}

module.exports = UserService;
