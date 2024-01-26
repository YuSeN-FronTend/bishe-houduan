"use strict";

const Controller = require("egg").Controller;

class ExpressDeliveryController extends Controller {
    // 获取所有的企业
    async getAllCompany() {
        const { ctx, app } = this;
        const companyInfo = await ctx.service.expressDelivery.getAllCompany();
        if(companyInfo && companyInfo.length) {
            let companyArr = [];
            companyInfo.forEach(item => {
                companyArr.push({
                    id: item.id,
                    name: item.name
                });
            });
            ctx.body = {
                code: 200,
                msg: '已获取全部企业！',
                data: companyArr
            }
        } else {
            ctx.body = {
                code: 500,
                msg: '获取失败（可能数据库出现问题或者没有企业入驻）!',
                data: null
            }
        }
    }
    // 寄快递存表
    async sendExpressDelivery() {
        // 数据补零
        function addZero(number) {
            if(number.toString().length === 1) {
                return `0${number}`
            } else {
                return number;
            }
        }
        const { ctx, app } = this;
        const sendQuery = ctx.request.body;
        sendQuery.trackNumber = `YS${Math.floor(Date.now() / 1000)}`;
        sendQuery.sendLocation = JSON.stringify(sendQuery.sendLocation);
        sendQuery.receiveLocation = JSON.stringify(sendQuery.receiveLocation);
        const date = new Date();
        const orderDate = `${date.getFullYear()}-${addZero(date.getMonth() + 1)}-${addZero(date.getDate())}`;
        const orderTime = ` ${addZero(date.getHours())}:${addZero(date.getMinutes())}:${addZero(date.getSeconds())}`;
        sendQuery.orderDate = orderDate;
        sendQuery.orderTime = orderDate + orderTime;
        const sendInfo = await ctx.service.expressDelivery.sendExpressDelivery(sendQuery);
        console.log(sendInfo);
        if(sendInfo) {
            ctx.body = {
                code: 200,
                msg: '下单成功！',
                data: null
            }
        } else {
            ctx.body = {
                code: 500,
                msg: '下单失败！（可能是数据库出现问题）',
                data: null
            }
        }
    }
    // 运单查询
    async searchWaybill() {
        const { ctx, app } = this;
        const waybillInfo = await ctx.service.expressDelivery.searchWaybill(ctx.request.body);
        if(waybillInfo) {
            waybillInfo.list.forEach(item => {
                item.receiveLocation = JSON.parse(item.receiveLocation);
                item.sendLocation = JSON.parse(item.sendLocation);
            })
            ctx.body = {
                code: 200,
                msg: '查询成功！',
                data: waybillInfo
            }
        }
    }
    // 运单评分
    async setRate() {
        const { ctx, app } = this;
        const rateValue = await ctx.service.expressDelivery.setRate(ctx.request.body);
        if(rateValue) {
            ctx.body = {
                code: 200,
                msg: '评价成功！',
                data: null
            }
        }
    }
    // 运单删除
    async deleteWaybill() {
        const { ctx, app } = this;
        const result = await ctx.service.expressDelivery.deleteWaybill(ctx.query.id);
        if(result.affectedRows === 1) {
            ctx.body = {
                code: 200,
                msg: '删除成功！',
                data: null
            }
        } else {
            ctx.body = {
                code: 500,
                msg: '删除失败！',
                data: null
            }
        }
    }
    // 跟据订单号查询订单
    async trackOrder() {
        const { ctx, app } = this;
        const orderInfo = await ctx.service.expressDelivery.trackOrder(ctx.query.trackNumber);
        if(orderInfo) {
            orderInfo.forEach(item => {
                item.receiveLocation = JSON.parse(item.receiveLocation);
                item.sendLocation = JSON.parse(item.sendLocation);
            })

            ctx.body = {
                code: 200,
                msg: '查询成功！',
                data: orderInfo,
            }
        } else {
            ctx.body = {
                code: 500,
                msg: '查询失败！',
                data: null,
            }
        }
    }
}

module.exports = ExpressDeliveryController;