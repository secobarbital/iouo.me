{renderable, nav, header, footer, section, h3, div, span, a, p, small, text} = require 'teacup'
accounting = require 'accounting'

balanceView = require './balance'
layout = require './layout'
urlFor = require '../lib/url_for'

module.exports = renderable ({balances, ower, total}) -> layout
  cdnjs: ['jquery']
  content: ->
    nav '.navbar', role: 'navigation', ->
      div '.navbar-header', ->
        a '.navbar-brand', href: '/', 'iouo.me'
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
            a '.list-group-item.list-group-link', href: "/transactions/#{ower}/#{owee}", ->
              balanceView ower: ower, owee: owee, amount: balance.value
    footer ->
      a '.btn.btn-primary.btn-block', href: urlFor.owe(ower), "Owe @#{ower}"
      a '.btn.btn-default.btn-block.roulette', href: "/roulette/#{ower}", 'Who pays?'
