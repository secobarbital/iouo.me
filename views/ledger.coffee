accounting = require 'accounting'
{renderable, header, footer, section, div, span, a, raw, script, text} = require 'teacup'

iou = require '../models/iou'
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
          console.log 'txn', txn
          raw txn.oembed.html
  footer ->
    a '.btn.btn-primary.btn-block', href: "https://twitter.com/intent/tweet?text=#{escape("@#{owee} #iou $")}", ->
      text "Owe @#{owee}"
  script
    async: true
    charset: 'utf-8'
    src: '//platform.twitter.com/widgets.js'
