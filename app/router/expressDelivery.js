'use script'

module.exports = app => {
    const { router, controller, middleware } = app;
    const jwt = middleware.jwt(app.config.jwt)
    router.get('/expressDelivery/company',jwt, controller.expressDelivery.getAllCompany);
    router.post('/expressDelivery/send', jwt, controller.expressDelivery.sendExpressDelivery);
    router.post('/expressDelivery/searchWaybill', jwt, controller.expressDelivery.searchWaybill);
}