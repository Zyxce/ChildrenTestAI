const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
  app.use(
    '/report',
    createProxyMiddleware({
      target: 'https://sirius-draw-test-94500a1b4a2f.herokuapp.com',
      changeOrigin: true,
      secure: false,
      onProxyRes: (proxyRes) => {
        // Разрешаем CORS для PDF
        proxyRes.headers['Access-Control-Allow-Origin'] = '*'
        proxyRes.headers['Content-Type'] = 'application/pdf'
      },
    })
  )
}
