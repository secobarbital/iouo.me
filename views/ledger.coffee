{renderable, div, h1, h4, ul, li, a, text} = require 'teacup'

layout = require './layout'

module.exports = renderable ({amount, owee, ower, txns}) -> layout content: ->
  div data: role: 'page', ->
    div data: role: 'header', ->
      h1 "@#{ower} owes @#{owee} $#{amount}"
    div data: role: 'content', ->
      ul data: role: 'listview', ->
        txns.forEach (txn) ->
          tweet = txn.doc.raw
          li ->
            a href: "http://twitter.com/#{tweet.user.id_str}/status/#{tweet.id_str}", rel: 'external', "@#{tweet.user.screen_name}: #{tweet.text}"
    a href: "https://twitter.com/intent/tweet?text=#{escape("@#{owee} #iou $#{amount}")}", rel: 'external', data: role: 'button', ->
      text "Owe @#{owee} back"
