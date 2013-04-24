{renderable, div, form, label, input, h1, h4, ul, li, a, img, strong, text} = require 'teacup'

layout = require './layout'

module.exports = renderable ({balances}) -> layout content: ->
  div data: role: 'page', ->
    div data: role: 'header', ->
      div '.logotype', ->
        div '.logotype-o', 'O'
        div '.logotype-u', 'U'
      h1 'I owe U'
      a '.ui-btn-right', href: '#owe-someone', data: icon: 'plus', theme: 'b', ->
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

  div '#owe-someone', data: role: 'page', ->
    div data: role: 'header', ->
      h1 'Owe Someone'
    div data: role: 'content', ->
      form ->
        label for: 'owee', 'Twitter screen name'
        input type: 'text', name: 'owee', value: '@'
        label for: 'amount', 'Amount'
        input type: 'text', name: 'amount', value: '$'
        input type: 'submit', value: 'Tweet It'
