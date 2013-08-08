accounting = require 'accounting'
{renderable, header, footer, section, div, span, p, a, time, text} = require 'teacup'

layout = require './layout'

module.exports = renderable ({balances}) -> layout content: ->
  header '.navbar', ->
    a '.navbar-brand', href: '/', 'iouo.me'
  section ->
    div '.list-group', ->
      balances.forEach (balance) ->
        [ower] = balance.key
        amount = balance.value.toFixed 2
        verb = if amount > 0 then 'owes' else 'is owed'
        a '.list-group-item', href: "/balances/#{ower}", ->
          span '.subject', "@#{ower}"
          span '.verb', " #{verb} "
          span '.amount', accounting.formatMoney Math.abs(amount), '$ '
  footer ->
    a '.btn.btn-primary.btn-lg.btn-block', href: '/owe', 'Owe someone'
