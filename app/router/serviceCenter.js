'use script'

module.exports = app => {
    const { router, controller, middleware } = app;
    const jwt = middleware.jwt(app.config.jwt)
    router.post('/serviceCenter/sendMsg', controller.serviceCenter.sendMsg);
    router.get('/serviceCenter/getChatList', controller.serviceCenter.getChatList);
    router.post('/serviceCenter/getChatHistory', controller.serviceCenter.getChatHistory);
    router.post('/serviceCenter/changeIsLook', controller.serviceCenter.changeIsLook);
}