{renderable, div, ul, li, a, img, h1, small, strong, text} = require 'teacup'

layout = require './layout'
refreshButton = require './refresh_button'

module.exports = renderable ({balances}) -> layout content: ->
  div '.home', data: role: 'page', ->
    div data: role: 'header', ->
      div '.logotype', ->
        div '.logotype-o', 'O'
        div '.logotype-u', 'U'
      h1 'Balances'
      refreshButton()
    div data: role: 'content', ->
      ul data: role: 'listview', ->
        balances.forEach (balance) ->
          [ower] = balance.key
          amount = balance.value.toFixed 2
          li ->
            a href: "/balances/#{ower}", data: prefetch: true, ->
              text "@#{ower}"
              strong '.ui-li-aside', "$#{amount}"
    div data: role: 'footer', ->
      div data: role: 'navbar', ->
        ul ->
          li ->
            a href: '/owe', data: role: 'button', icon: 'plus', prefetch: true, ->
              text "Owe someone"
