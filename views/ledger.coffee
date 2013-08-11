accounting = require 'accounting'
{renderable, header, footer, section, h4, div, span, a, p, small, time, text} = require 'teacup'

layout = require './layout'

module.exports = renderable ({amount, owee, ower, txns, xhr}) -> layout xhr: xhr, content: ->
  header '.navbar', ->
    a '.navbar-brand', href: '/', 'iouo.me'
  section '.transactions', ->
    div '.panel', ->
      div '.panel-heading.clearfix', ->
        if amount > 0
          a href: "/balances/#{ower}", "@#{ower}"
          text ' owes '
          a href: "/balances/#{owee}", "@#{owee}"
        else
          text "@#{owee} owes @#{ower}"
        span '.amount', accounting.formatMoney Math.abs(amount), '$ '
      div '.list-group', ->
        txns.forEach (txn) ->
          tweet = txn.doc.raw
          a '.list-group-item', href: "http://twitter.com/#{tweet.user.id_str}/status/#{tweet.id_str}", ->
            h4 '.list-group-item-heading', tweet.user.screen_name
            p '.list-group-item-text', tweet.text
            small '.text-muted', ->
              time datetime: new Date(tweet.created_at).toISOString()
  footer ->
    a '.btn.btn-primary.btn-block', href: "https://twitter.com/intent/tweet?text=#{escape("@#{owee} #iou $")}", ->
      text "Owe @#{owee}"
