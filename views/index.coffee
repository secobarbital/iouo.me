{renderable, div, h1, h4, ul, li, a, img, strong, text} = require 'teacup'

layout = require './layout'

module.exports = renderable ({balances}) -> layout content: ->
  div data: role: 'page', ->
    div data: role: 'header', ->
      div '.logotype', ->
        div '.logotype-o', 'O'
        div '.logotype-u', 'U'
      h1 'I owe U'
      a '.ui-btn-right', href: '/owe', data: icon: 'plus', theme: 'b', prefetch: true, ->
        text 'Owe someone'
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
      h4 'U owe Me'
