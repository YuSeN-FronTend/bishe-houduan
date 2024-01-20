'use script'

const { middleware } = require("../../config.default");

module.exports = app => {
    const { router, controller, middleware } = app;
    const jwt = middleware.jwt(app.config.jwt)
    router.get('/', controller.home.index);
    router.post('/getData', jwt, controller.home.getData)
}