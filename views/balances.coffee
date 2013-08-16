accounting = require 'accounting'
{renderable, header, footer, section, div, span, a, p, small, text} = require 'teacup'

layout = require './layout'

module.exports = renderable ({balances, ower, total, xhr}) -> layout xhr: xhr, content: ->
  nav '.navbar', role: 'navigation', ->
    div '.navbar-header', ->
      a '.navbar-brand', href: '/', 'iouo.me'
  section '.balances', ->
    div '.panel', ->
      div '.panel-heading.clearfix', ->
        verb = if total > 0 then 'owes' else 'is owed'
        span '.subject', "@#{ower} "
        span '.verb', verb
        span '.amount', accounting.formatMoney Math.abs(total), '$ '
      div '.list-group', ->
        balances.forEach (balance) ->
          [ower, owee] = balance.key
          amount = balance.value
          a '.list-group-item', href: "/transactions/#{ower}/#{owee}", ->
            if amount > 0
              span '.verb', 'owes '
              span '.subject', "@#{owee}"
              span '.amount', accounting.formatMoney Math.abs(amount), '$ '
            else
              span '.subject', "@#{owee}"
              span '.verb', ' owes'
              span '.amount', accounting.formatMoney Math.abs(amount), '$ '
  footer ->
    a '.btn.btn-primary.btn-block', href: "https://twitter.com/intent/tweet?text=#{escape("@#{ower} #iou $")}", "Owe @#{ower}"
