{renderable, nav, section, h1, div, span, a, text} = require 'teacup'

layout = require './layout'

module.exports = renderable ({user}) -> layout
  cdnjs: ['jquery']
  inlinejs: ['roulette']
  content: ->
    nav '.navbar', role: 'navigation', ->
      div '.navbar-header', ->
        a '.navbar-brand', href: '/', 'iouo.me'
    section '.roulette', ->
      h1 '.roulette-headline', ->
      div '.panel.panel-default.roulette-panel', ->
    section '.roulette-errors', ->
      div '.alert.alert-danger.roulette-features-missing', ->
        text 'Sorry! IOU Roulette requires a browser with '
        a href: 'http://html5test.com/compare/feature/location-geolocation/communication-eventSource.html', ->
          text 'Geolocation and Server-Sent Events'
      div '.alert.alert-danger.roulette-geo-permission-denied', ->
        text 'IOU Roulette needs to know your location in order to find other users nearby. '
        a '.roulette-geo-enable', href: '#', "Let's try again"
      div '.alert.alert-danger.roulette-geo-position-unavailable', ->
        text 'Position unavailable. '
        a '.roulette-geo-enable', href: '#', "Let's try again"
      div '.alert.alert-danger.roulette-geo-timeout', ->
        text 'Timeout trying to determine your position. '
        a '.roulette-geo-enable', href: '#', "Let's try again"
      div '.alert.alert-danger.roulette-geo-error', ->
        text 'Unable to determine your position: '
        span '.roulette-geo-error-message', ''
        text ' '
        a '.roulette-geo-enable', href: '#', "Let's try again"
