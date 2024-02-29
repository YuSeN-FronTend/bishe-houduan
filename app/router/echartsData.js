'use script'

module.exports = app => {
    const { router, controller, middleware } = app;
    const jwt = middleware.jwt(app.config.jwt)
    router.get('/echartsData/dashboardBar',jwt, controller.echartsData.dashboardBarEcharts);
    router.get('/echartsData/dashboardTotalCounts',jwt, controller.echartsData.dashboardTotalCounts);
}