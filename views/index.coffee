{renderable, div, form, label, input, h1, h4, ul, li, a, img, strong, text} = require 'teacup'

layout = require './layout'

module.exports = renderable ({balances, head, foot}) -> layout content: ->
  div '#balances', data: role: 'page', ->
    div data: role: 'header', ->
      div '.logotype', ->
        div '.logotype-o', 'O'
        div '.logotype-u', 'U'
      h1 head || 'I owe U'
      a '.ui-btn-right', href: '#owe-someone', data: icon: 'plus', theme: 'b', ->
        text 'Owe someone'
    div data: role: 'content', ->
      ul '#balances', data: role: 'listview', ->
        balances.forEach (balance) ->
          li ->
            [ower, owee] = balance.key
            amount = balance.value.toFixed 2
            if owee?
              a href: "/transactions/#{ower}/#{owee}", data: prefetch: true, ->
                text "@#{owee}"
                strong '.ui-li-aside', "$#{amount}"
            else
              a href: "/balances/#{ower}", data: prefetch: true, ->
                text "@#{ower}"
                strong '.ui-li-aside', "$#{amount}"
    div data: role: 'footer', ->
      h4 foot || 'U owe Me'

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
