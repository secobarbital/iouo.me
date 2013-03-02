{renderable, ul, li, a} = require 'teacup'

layout = require './layout'

module.exports = renderable ({txns}) -> layout content: ->
  ul data: role: 'listview', ->
    txns.forEach (txn) ->
      tweet = txn.doc.raw
      li ->
        a href: "http://twitter.com/#{tweet.user.id_str}/status/#{tweet.id_str}", "@#{tweet.user.screen_name}: #{tweet.text}"
