{renderable, nav, header, footer, section, h4, div, span, img, a, p, small, time, text, raw, script} = require 'teacup'
accounting = require 'accounting'

amountView = require './amount'
layout = require './layout'
urlFor = require '../lib/url_for'

module.exports = renderable ({amount, owee, ower, txns}) -> layout
  externaljs: ['jquery', 'jquery.timeago']
  inlinejs: ['ledger']
  content: ->
    nav '.navbar', role: 'navigation', ->
      div '.navbar-header', ->
        a '.navbar-brand', href: '/', 'iouo.me'
    section '.transactions', ->
      div '.panel.panel-default', ->
        div '.panel-heading.clearfix', ->
          if amount > 0
            a href: "/balances/#{ower}", "@#{ower}"
            text ' owes '
            a href: "/balances/#{owee}", "@#{owee}"
          else
            a href: "/balances/#{owee}", "@#{owee}"
            text ' owes '
            a href: "/balances/#{ower}", "@#{ower}"
          amountView amount: Math.abs(amount)
        div '.list-group', ->
          txns.forEach (txn) ->
            tweet = txn.doc.raw
            dir = if tweet.user.screen_name == owee ^ amount > 0 then 'left' else 'right'
            a '.list-group-item.media.list-group-link.list-group-media', href: "http://twitter.com/#{tweet.user.id_str}/status/#{tweet.id_str}", ->
              img ".media-object.pull-#{dir}", src: tweet.user.profile_image_url
              div ".media-body.text-#{dir}", ->
                div "#{tweet.text}"
                small '.text-muted', ->
                  raw '&mdash;'
                  text " #{tweet.user.screen_name} "
                  time datetime: new Date(tweet.created_at).toISOString()
    footer ->
      a '.btn.btn-primary.btn-block', href: urlFor.owe(owee), ->
        text "Owe @#{owee}"
