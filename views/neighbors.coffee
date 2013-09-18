{renderable, nav, header, section, div, span, a} = require 'teacup'
accounting = require 'accounting'

balanceView = require './balance'
urlFor = require '../lib/url_for'

module.exports = renderable ({ower, balances, total}) ->
  div '.panel-heading.clearfix.roulette-heading', ->
    span '.verb.roulette-owed', 'The group owes ' if total < 0
    span '.subject', "@#{ower}"
    span '.verb.roulette-owes', ' owes the group' if total >= 0
    span '.amount', accounting.formatMoney Math.abs(total), '$ '
  div '.list-group.roulette-neighbors', ->
    unless balances.length
      div '.list-group-item', 'Nobody here! :-('
    balances.forEach (balance) ->
      [ower, owee] = balance.key
      a '.list-group-item', href: urlFor.owe(owee), ->
        balanceView owee: owee, amount: balance.value
