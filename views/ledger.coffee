accounting = require 'accounting'
{renderable, header, footer, section, div, span, a, small, time, text} = require 'teacup'

layout = require './layout'

module.exports = renderable ({amount, owee, ower, txns, xhr}) -> layout xhr: xhr, content: ->
  header '.navbar', ->
    a '.navbar-brand', href: '/', 'iouo.me'
  section '.transactions', ->
    div '.panel', ->
      div '.panel-heading', ->
        if amount > 0
          text "@#{ower} owes @#{owee} "
        else
          text "@#{owee} owes @#{ower} "
        span '.amount', accounting.formatMoney Math.abs(amount), '$ '
      div '.list-group', ->
        txns.forEach (txn) ->
          tweet = txn.doc.raw
          a '.list-group-item', href: "http://twitter.com/#{tweet.user.id_str}/status/#{tweet.id_str}", ->
            text tweet.text
            small '.text-muted.pull-right', ->
              time datetime: new Date(tweet.created_at).toISOString()
  footer ->
    a '.btn.btn-primary.btn-block', href: "https://twitter.com/intent/tweet?text=#{escape("@#{ower} #iou $")}", ->
      text "Owe @#{ower}"
    a '.btn.btn-primary.btn-block', href: "https://twitter.com/intent/tweet?text=#{escape("@#{owee} #iou $")}", ->
      text "Owe @#{owee}"
