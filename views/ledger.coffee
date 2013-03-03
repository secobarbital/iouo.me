{renderable, div, h1, h4, ul, li, a} = require 'teacup'

layout = require './layout'

module.exports = renderable ({owee, ower, txns}) -> layout content: ->
  total = 0
  div data: role: 'page', ->
    div data: role: 'header', ->
      h1 "@#{ower} owes @#{owee}"
    div data: role: 'content', ->
      ul data: role: 'listview', ->
        txns.forEach (txn) ->
          tweet = txn.doc.raw
          total += txn.value
          li ->
            a href: "http://twitter.com/#{tweet.user.id_str}/status/#{tweet.id_str}", "@#{tweet.user.screen_name}: #{tweet.text}"
    div data: role: 'footer', ->
      h4 "$#{total}"
