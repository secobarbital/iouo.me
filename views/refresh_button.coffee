{renderable, a, time} = require 'teacup'

module.exports = renderable ->
  a '.button.refresh', href: '/', ->
    time '.freshness', datetime: new Date().toISOString()
