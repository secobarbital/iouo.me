accounting = require 'accounting'
{renderable, header, footer, section, div, span, a, p, small, text} = require 'teacup'

layout = require './layout'

module.exports = renderable ({balances, ower, total, xhr}) -> layout xhr: xhr, content: ->
  header '.navbar', ->
    a '.navbar-brand', href: '/', 'iouo.me'
  section '.balances', ->
    div '.panel', ->
      div '.panel-heading', ->
        verb = if total > 0 then 'owes' else 'is owed'
        text "@#{ower} #{verb} "
        span '.amount', accounting.formatMoney Math.abs(total), '$ '
      div '.list-group', ->
        balances.forEach (balance) ->
          [ower, owee] = balance.key
          amount = balance.value.toFixed 2
          verb = if amount < 0 then 'owes' else 'is owed'
          a '.list-group-item', href: "/transactions/#{ower}/#{owee}", ->
            span '.subject', "@#{owee}"
            span '.verb', " #{verb} "
            span '.amount', accounting.formatMoney Math.abs(amount), '$ '
    footer ->
      a '.btn.btn-primary.btn-block', href: "https://twitter.com/intent/tweet?text=#{escape("@#{ower} #iou $")}", "Owe @#{ower}"
