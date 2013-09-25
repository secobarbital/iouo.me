{renderable, nav, footer, section, div, span, p, a, time, text} = require 'teacup'
accounting = require 'accounting'

amountView = require './amount'
layout = require './layout'

module.exports = renderable ({balances}) -> layout content: ->
  nav '.navbar', role: 'navigation', ->
    div '.navbar-header', ->
      a '.navbar-brand', href: '/', 'iouo.me'
  section ->
    div '.list-group', ->
      balances.forEach (balance) ->
        [ower] = balance.key
        amount = balance.value.toFixed 2
        verb = if amount > 0 then 'owes' else 'is owed'
        a '.list-group-item.list-group-link', href: "/balances/#{ower}", ->
          span '.subject', "@#{ower}"
          span '.verb', " #{verb} "
          div '.list-group-link-rhs', ->
            amountView amount: Math.abs(amount)
  footer ->
    a '.btn.btn-primary.btn-block', href: '/owe', 'Owe someone'
