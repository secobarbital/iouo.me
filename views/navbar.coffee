{nav, div, span, a} = require 'teacup'

module.exports = ->
  nav '.navbar', role: 'navigation', ->
    div '.navbar-header', ->
      a '.navbar-brand', href: '/', ->
        span '.logotype', 'IOU'
