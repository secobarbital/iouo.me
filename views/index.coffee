accounting = require 'accounting'

{renderable, header, div, form, span, ul, li, a, p, h1, small, text, time} = require 'teacup'

layout = require './layout'
refreshButton = require './refresh_button'

module.exports = renderable ({balances}) -> layout content: ->
  header '.bar-title', ->
    h1 '.title', 'iouo.me'
  div '#balances.content', ->
    div '.content-padded', ->
      p '.updated', ->
        text 'Updated '
        time datetime: new Date().toISOString()
        text '. '
        span '.updating', ->
    ul '.list.inset', ->
      balances.forEach (balance) ->
        [ower] = balance.key
        verb = (balance.value > 0) && ' owes ' || ' is owed '
        amount = accounting.formatMoney Math.abs balance.value
        li ->
          a href: "/balances/#{ower}", ->
            span '.subject', "@#{ower}"
            span '.object', ->
              text verb
              span '.amount', amount
            span '.chevron'
    a '.button-main.button-block', href: '/owe', 'Owe someone'
