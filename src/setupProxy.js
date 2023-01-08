const { createProxyMiddleware } = require('http-proxy-middleware');

const API_URL = 'https://crafsmen-backend-server.onrender.com';

module.exports = function (app) {






  app.use(
    '/customerLogin',
    createProxyMiddleware({
      target: API_URL,
      changeOrigin: true,
      pathRewrite: function (path, req) {
        return `/api/v1/entrance/customer`;
      }
    })
  );
  
  app.use(
    '/validateCustomerOtp',
    createProxyMiddleware({
      target: API_URL,
      changeOrigin: true,
      pathRewrite: function (path, req) {
        return `api/v1/entrance/validate-customer`;
      }
    })
  );

  app.use(
    '/getServicesList',
    createProxyMiddleware({
      target: API_URL,
      changeOrigin: true,
      pathRewrite: function (path, req) {
        return `/api/v1/entrance/services`;
      }
    })
  );

  app.use(
    '/getService',
    createProxyMiddleware({
      target: API_URL,
      changeOrigin: true,
      pathRewrite: function (path, req) {
        return `/api/v1/entrance/services/${req.query.i}`;
      }
    })
  );

  app.use(
    '/getServicePrice',
    createProxyMiddleware({
      target: API_URL,
      changeOrigin: true,
      pathRewrite: function (path, req) {
        return `api/v1/entrance/service-details/${req.query.i}`;
      }
    })
  );
























  app.use(
    '/dologin',
    createProxyMiddleware({
      target: API_URL,
      changeOrigin: true,
      pathRewrite: function (path, req) {
        return `/api/v1/entrance/login`;
      }
    })
  );

  app.use(
    '/refreshToken',
    createProxyMiddleware({
      target: API_URL,
      changeOrigin: true,
      pathRewrite: function (path, req) {
        return `/api/v1/entrance/refreshToken`;
      }
    })
  );

  /* ---- Service Type ---- */
  app.use(
    '/getServicesTypeList',
    createProxyMiddleware({
      target: API_URL,
      changeOrigin: true,
      pathRewrite: function (path, req) {
        return `/api/v1/entrance/service-type`;
      }
    })
  );

  app.use(
    '/addNewServiceType',
    createProxyMiddleware({
      target: API_URL,
      changeOrigin: true,
      pathRewrite: function (path, req) {
        return `/api/v1/entrance/service-type`;
      }
    })
  );

  app.use(
    '/deleteServiceType',
    createProxyMiddleware({
      target: API_URL,
      changeOrigin: true,
      pathRewrite: function (path, req) {
        return `/api/v1/entrance/service-type/${req.query.i}`;
      }
    })
  );

  app.use(
    '/updateServiceType',
    createProxyMiddleware({
      target: API_URL,
      changeOrigin: true,
      pathRewrite: function (path, req) {
        return `/api/v1/entrance/service-type/${req.query.i}`;
      }
    })
  );
  /* ---- ./Service Type ---- */

  /* ---- Service List ---- */


  app.use(
    '/addNewService',
    createProxyMiddleware({
      target: API_URL,
      changeOrigin: true,
      pathRewrite: function (path, req) {
        return `/api/v1/entrance/services`;
      }
    })
  );

  app.use(
    '/deleteService',
    createProxyMiddleware({
      target: API_URL,
      changeOrigin: true,
      pathRewrite: function (path, req) {
        return `/api/v1/entrance/services/${req.query.i}`;
      }
    })
  );

  app.use(
    '/updateService',
    createProxyMiddleware({
      target: API_URL,
      changeOrigin: true,
      pathRewrite: function (path, req) {
        return `/api/v1/entrance/services/${req.query.i}`;
      }
    })
  );
  /* ---- ./Service List ---- */

  /* ---- Contractor List ---- */
  app.use(
    '/getContractorsList',
    createProxyMiddleware({
      target: API_URL,
      changeOrigin: true,
      pathRewrite: function (path, req) {
        return `/api/v1/entrance/contractors`;
      }
    })
  );

  app.use(
    '/deleteContractor',
    createProxyMiddleware({
      target: API_URL,
      changeOrigin: true,
      pathRewrite: function (path, req) {
        return `/api/v1/entrance/contractors/${req.query.i}`;
      }
    })
  );

  app.use(
    '/updateContractor',
    createProxyMiddleware({
      target: API_URL,
      changeOrigin: true,
      pathRewrite: function (path, req) {
        return `/api/v1/entrance/contractors/${req.query.i}`;
      }
    })
  );

  app.use(
    '/addNewContractor',
    createProxyMiddleware({
      target: API_URL,
      changeOrigin: true,
      pathRewrite: function (path, req) {
        return `/api/v1/entrance/contractors`;
      }
    })
  );
  /* ---- ./Contractor List ---- */

};