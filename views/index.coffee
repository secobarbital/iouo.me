{renderable, header, nav, section, footer, div, ul, li, a, img, h1, small, span, text} = require 'teacup'

layout = require './layout'
refreshButton = require './refresh_button'

module.exports = renderable ({balances}) -> layout content: ->
  header ->
    div '.logotype', ->
      div '.logotype-o', 'O'
      div '.logotype-u', 'U'
    h1 'iouo.me'
    refreshButton()
  section '#content', ->
    nav ->
      ul '.listview', ->
        balances.forEach (balance) ->
          [ower] = balance.key
          amount = balance.value.toFixed 2
          li '.balance', ->
            a href: "/balances/#{ower}", ->
              span '.subject', "@#{ower}"
              span '.verb', amount > 0 && ' owes ' || ' is owed '
              span '.amount', "$#{amount}"
  footer ->
    ul ->
      li ->
        a href: '/owe', data: role: 'button', icon: 'plus', prefetch: true, ->
          text "Owe someone"
