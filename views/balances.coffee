{renderable, div, form, label, input, h1, h4, ul, li, a, img, strong, text} = require 'teacup'

layout = require './layout'

module.exports = renderable ({balances, ower, total}) -> layout content: ->
  div '.balances', role: 'page', ->
    div data: role: 'header', ->
      a href: '/', data: icon: 'arrow-l', ->
        text 'I owe U'
      h1 "@#{ower} owes $#{total.toFixed 2}"
    div data: role: 'content', ->
      ul data: role: 'listview', ->
        balances.forEach (balance) ->
          li ->
            [ower, owee] = balance.key
            amount = balance.value.toFixed 2
            a href: "/transactions/#{ower}/#{owee}", data: prefetch: true, ->
              text "@#{owee}"
              strong '.ui-li-aside', "$#{amount}"
    div data: role: 'footer', ->
      div data: role: 'navbar', ->
        ul ->
          li ->
            a href: "https://twitter.com/intent/tweet?text=#{escape("@#{ower} #iou $")}", rel: 'external', data: role: 'button', icon: 'plus', iconpos: 'left', ->
              text "Owe @#{ower}"
