{renderable, div, h1, ul, li, a, p, strong, time, text} = require 'teacup'

layout = require './layout'
refreshButton = require './refresh_button'

module.exports = renderable ({amount, owee, ower, txns, xhr}) -> layout xhr: xhr, content: ->
  div '.ledger', data: role: 'page', ->
    div data: role: 'header', ->
      a href: "/balances/#{ower}", data: icon: 'arrow-l', rel: 'back', ->
        text "@#{ower}"
      h1 "@#{ower} owes @#{owee} $#{amount.toFixed 2}"
      refreshButton()
    div data: role: 'content', ->
      ul data: role: 'listview', ->
        txns.forEach (txn) ->
          tweet = txn.doc.raw
          li ->
            a href: "http://twitter.com/#{tweet.user.id_str}/status/#{tweet.id_str}", rel: 'external', ->
              p '.ui-li-aside', ->
                time datetime: new Date(tweet.created_at).toISOString()
              text tweet.text
    div data: role: 'footer', ->
      div data: role: 'navbar', ->
        ul ->
          li ->
            a href: "https://twitter.com/intent/tweet?text=#{escape("@#{ower} #iou $")}", rel: 'external', data: role: 'button', icon: 'arrow-l', iconpos: 'left', ->
              text "Owe @#{ower}"
          li ->
            a href: "https://twitter.com/intent/tweet?text=#{escape("@#{owee} #iou $")}", rel: 'external', data: role: 'button', icon: 'arrow-r', iconpos: 'right', ->
              text "Owe @#{owee}"
