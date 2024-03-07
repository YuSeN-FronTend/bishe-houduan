'use script'

module.exports = app => {
    const { router, controller, middleware } = app;
    const jwt = middleware.jwt(app.config.jwt)
    router.get('/echartsData/dashboardBar',jwt, controller.echartsData.dashboardBarEcharts);
    router.get('/echartsData/dashboardTotalCounts',jwt, controller.echartsData.dashboardTotalCounts);
    router.get('/echartsData/saleAmountCount',jwt, controller.echartsData.saleAmountCount);
    router.get('/echartsData/goodsNameClassify',jwt, controller.echartsData.goodsNameClassify)
}