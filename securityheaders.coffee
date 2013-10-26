exports.secure = secure = (app) ->
  app.disable 'x-powered-by'
  app.use secureHeaders

secureHeaders = (req, res, next) ->
  res.set
    'Content-Security-Policy': [
      "default-src 'self' cdn.iouo.me;"
      "frame-src 'none';"
      "img-src 'self' cdn.iouo.me www.google-analytics.com *.twimg.com;"
      "script-src 'unsafe-inline' 'self' cdn.iouo.me www.google-analytics.com;"
      "style-src 'unsafe-inline' 'self' cdn.iouo.me;"
    ].join ' '
    'X-Content-Type-Options': 'nosniff'
    'X-Frame-Options': 'SAMEORIGIN'
    'X-Permitted-Cross-Domain-Policies': 'master-only'
    'X-XSS-Protection': '1; mode=block'
  next()
