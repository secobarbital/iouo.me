accounting = require 'accounting'
{renderable, header, footer, div, span, ul, li, a, img, time, h1, small, strong, text, raw} = require 'teacup'

layout = require './layout'
refreshButton = require './refresh_button'

module.exports = renderable ({balances}) -> layout content: ->
  header ->
    div '.logotype', ->
      div '.logotype-o', 'O'
      div '.logotype-u', 'U'
    h1 'Balances'
    time '.freshness', datetime: new Date().toISOString()
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
    ul ->
      li ->
        a href: '/owe', data: role: 'button', icon: 'plus', prefetch: true, ->
          text "Owe someone"
