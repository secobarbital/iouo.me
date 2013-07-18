{renderable, div, form, label, input, h1, h4, ul, li, a, img, strong, text} = require 'teacup'

layout = require './layout'
refreshButton = require './refresh_button'

module.exports = renderable ({balances, ower, total, xhr}) -> layout xhr: xhr, content: ->
  div '.balances', role: 'page', ->
    div data: role: 'header', ->
      a href: '/', data: icon: 'arrow-l', direction: 'reverse', ->
        text 'Balances'
      h1 "@#{ower} owes $#{total.toFixed 2}"
      refreshButton()
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
