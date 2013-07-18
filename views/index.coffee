{renderable, div, ul, li, a, img, raw, small, strong, text, time} = require 'teacup'

layout = require './layout'

module.exports = renderable ({balances}) -> layout content: ->
  div '.home', data: role: 'page', ->
    div data: role: 'header', ->
      div '.logotype', ->
        div '.logotype-o', 'O'
        div '.logotype-u', 'U'
      time '.freshness', style: 'display: none', datetime: new Date().toISOString(), ->
      div '.ui-title', ->
        raw '&nbsp;'
      a '.ui-btn-right.refresh', href: '/', data: icon: 'refresh', theme: 'b', ->
        text 'Refresh'
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
