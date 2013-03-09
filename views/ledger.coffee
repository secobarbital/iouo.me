{renderable, div, h1, h2, h4, ul, li, a, p, strong, time, text, raw, coffeescript} = require 'teacup'

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
            a href: "http://twitter.com/#{tweet.user.id_str}/status/#{tweet.id_str}", rel: 'external', ->
              p '.ui-li-aside', ->
                time datetime: new Date(tweet.created_at).toISOString()
              text tweet.text
    a href: "https://twitter.com/intent/tweet?text=#{escape("@#{ower} #iou $#{amount}")}", rel: 'external', data: {role: 'button', icon: 'arrow-l', iconpos: 'left', inline: 'true'}, ->
      text "Owe @#{ower}"
    a href: "https://twitter.com/intent/tweet?text=#{escape("@#{owee} #iou $#{amount}")}", rel: 'external', data: {role: 'button', icon: 'arrow-r', iconpos: 'right', inline: 'true'}, ->
      text "Owe @#{owee}"
    coffeescript ->
      $ ->
        $('time').timeago()
