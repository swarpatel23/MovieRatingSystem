const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function (app) {
    app.use(createProxyMiddleware('/api',
        { target: 'http://localhost:8000' }
    ));

    app.use(createProxyMiddleware('/model',
        { target: 'http://localhost:12345' }
    ));


}