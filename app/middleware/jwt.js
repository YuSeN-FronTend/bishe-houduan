module.exports = (config) => {
    return async function jwt(ctx, next) {
            const token = ctx.request.header.authorization;
            let decode = null;
            if (token != 'null' && token) {
                try {
                    decode = ctx.app.jwt.verify(token, config.secret); // 验证token
                    console.log(decode, 123);
                    await next();
                } catch (error) {
                    console.log(error, 34);
                    ctx.body = {
                        msg: '无效token',
                        code: 401,
                    }
                    return;
                }
            } else {
                ctx.body = {
                    code: 500,
                    msg: 'token不存在',
                };
                return;
            }
    }
}