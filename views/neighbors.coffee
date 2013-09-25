{renderable, nav, header, section, div, span, a, text} = require 'teacup'
accounting = require 'accounting'

amountView = require './amount'
balanceView = require './balance'
urlFor = require '../lib/url_for'

module.exports = renderable ({ower, balances, total}) ->
  div '.panel-heading.clearfix.roulette-heading', ->
    span '.verb.roulette-owed', 'The group owes ' if total < 0
    text '@'
    span '.subject', "#{ower}"
    span '.verb.roulette-owes', ' owes the group' if total >= 0
    div '.panel-heading-rhs', ->
      amountView amount: Math.abs(total)
  div '.list-group.roulette-neighbors', ->
    unless balances.length
      div '.list-group-item', 'Nobody here! :-('
    balances.forEach (balance) ->
      [ower, owee] = balance.key
      a '.list-group-item.list-group-link', href: urlFor.owe(owee), ->
        balanceView owee: owee, amount: balance.value
