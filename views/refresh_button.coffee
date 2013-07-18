{renderable, a, time} = require 'teacup'

module.exports = renderable ->
  a '.ui-btn-right.refresh', href: '/', data: icon: 'refresh', theme: 'b', ->
    time '.freshness', datetime: new Date().toISOString()
