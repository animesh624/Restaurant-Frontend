const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://webappnewcreated.azurewebsites.net',
      changeOrigin: true,
    })
  );
};
