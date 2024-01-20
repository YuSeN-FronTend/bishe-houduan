'use script'

module.exports = app => {
    const { router, controller, middleware } = app;
    const jwt = middleware.jwt(app.config.jwt)
    router.post('/user/login', controller.user.login);
    router.post('/user/register', controller.user.register);
    router.post('/user/changeUserInfo',jwt, controller.user.changeUserInfo)
}