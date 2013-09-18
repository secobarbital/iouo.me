{renderable, nav, section, div, a} = require 'teacup'

layout = require './layout'

module.exports = renderable ({user}) -> layout
  cdnjs: ['jquery']
  inlinejs: ['roulette']
  content: ->
    nav '.navbar', role: 'navigation', ->
      div '.navbar-header', ->
        a '.navbar-brand', href: '/', 'iouo.me'
    section '.roulette', ->
      div '.panel.panel-default.roulette-panel', ->
