const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://curdapp20230707121043.azurewebsites.net',
      changeOrigin: true,
    })
  );
};
