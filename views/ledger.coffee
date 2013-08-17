accounting = require 'accounting'
{renderable, nav, header, footer, section, h4, div, span, img, a, p, small, time, text, raw} = require 'teacup'

layout = require './layout'

module.exports = renderable ({amount, owee, ower, txns, xhr}) -> layout xhr: xhr, content: ->
  nav '.navbar', role: 'navigation', ->
    div '.navbar-header', ->
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
          dir = if tweet.user.screen_name == owee ^ amount > 0 then 'left' else 'right'
          a '.list-group-item.media', href: "http://twitter.com/#{tweet.user.id_str}/status/#{tweet.id_str}", ->
            img ".media-object.pull-#{dir}", src: tweet.user.profile_image_url
            div ".media-body.text-#{dir}", ->
              div "#{tweet.text}"
              small '.text-muted', ->
                raw '&mdash;'
                text " #{tweet.user.screen_name} "
                time datetime: new Date(tweet.created_at).toISOString()
  footer ->
    a '.btn.btn-primary.btn-block', href: "https://twitter.com/intent/tweet?text=#{escape("@#{owee} #iou $")}", ->
      text "Owe @#{owee}"
