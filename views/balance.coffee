{a, div, span} = require 'teacup'
accounting = require 'accounting'

amountView = require './amount'

module.exports = ({owee, amount}) ->
  if amount > 0
    span '.verb', 'owes '
    span '.subject', "@#{owee}"
    div '.list-group-link-rhs', ->
      amountView amount: Math.abs(amount)
  else if amount < 0
    span '.subject', "@#{owee}"
    span '.verb', ' owes'
    div '.list-group-link-rhs', ->
      amountView amount: Math.abs(amount)
  else
    span '.subject', "@#{owee}"
    span '.verb', ' is even'
