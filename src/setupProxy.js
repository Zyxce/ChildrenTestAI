const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
  app.use(
    '/upload',
    createProxyMiddleware({
      target: 'https://sirius-draw-test-94500a1b4a2f.herokuapp.com',
      changeOrigin: true,
      secure: false,
      onProxyReq: (proxyReq) => {
        // Добавляем заголовки для CORS
        proxyReq.setHeader('Access-Control-Allow-Origin', '*')
        proxyReq.setHeader('Access-Control-Allow-Methods', 'PUT, OPTIONS')
        proxyReq.setHeader('Access-Control-Allow-Headers', 'Content-Type')
      },
    })
  )
}
