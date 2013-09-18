{renderable, nav, header, section, div, span, a} = require 'teacup'

layout = require './layout'

module.exports = renderable ({user}) -> layout
  externaljs: ['jquery']
  inlinejs: ['roulette']
  content: ->
    nav '.navbar', role: 'navigation', ->
      div '.navbar-header', ->
        a '.navbar-brand', href: '/', 'iouo.me'
    section '.roulette', ->
      div '.panel.panel-default', ->
        div '.panel-heading.clearfix', 'Nearby'
        div '.list-group', ->
          div '.list-group-item', user
