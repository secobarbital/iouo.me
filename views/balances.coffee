accounting = require 'accounting'
{renderable, nav, header, footer, section, h3, div, span, a, p, small, text} = require 'teacup'

layout = require './layout'

module.exports = renderable ({balances, ower, total}) -> layout
  cdnjs: ['jquery']
  inlinejs: ['roulette']
  content: ->
    nav '.navbar', role: 'navigation', ->
      div '.navbar-header', ->
        a '.navbar-brand', href: '/', 'iouo.me'
    section '.neighbors', ->
      div '.panel.panel-default', ->
        div '.panel-heading.clearfix', ->
          h3 '.panel-title', 'Nearby'
        div '.list-group', ->
        div '.panel-footer.clearfix', ->
          span '.verb.roulette-owed', 'The group owes '
          span '.subject', "@#{ower}"
          span '.verb.roulette-owes', ' owes the group'
          span '.amount', accounting.formatMoney Math.abs(total), '$ '
    section '.balances', ->
      div '.panel.panel-default', ->
        div '.panel-heading.clearfix', ->
          verb = if total > 0 then 'owes' else 'is owed'
          span '.subject', "@#{ower} "
          span '.verb', verb
          span '.amount', accounting.formatMoney Math.abs(total), '$ '
        div '.list-group', ->
          balances.forEach (balance) ->
            [ower, owee] = balance.key
            amount = balance.value
            a '.list-group-item.list-group-link', href: "/transactions/#{ower}/#{owee}", ->
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
      a '.btn.btn-default.btn-block.roulette.hidden', href: "#", 'Who pays?'
