'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  require('./router/user')(app)
  require('./router/index')(app)
  require('./router/expressDelivery')(app)
  require('./router/echartsData')(app)
  require('./router/serviceCenter')(app);
};
