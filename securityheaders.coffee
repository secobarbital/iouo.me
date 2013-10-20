exports.secure = secure = (app) ->
  app.disable 'x-powered-by'
  app.use secureHeaders

secureHeaders = (req, res, next) ->
  res.set
    'X-Frame-Options': 'SAMEORIGIN'
    'X-Content-Type-Options': 'nosniff'
    'X-XSS-Protection': '1; mode=block'
    'X-Content-Security-Policy': [
      "default-src 'self' http://cdn.iouo.me/;"
      "img-src 'self' http://www.google-analytics.com/;"
      "script-src 'self' http://cdn.iouo.me/ http://www.google-analytics.com/;"
    ].join ' '
    'X-Permitted-Cross-Domain-Policies': 'master-only'
  next()
