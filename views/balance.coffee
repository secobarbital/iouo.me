{a, div, span, text} = require 'teacup'
accounting = require 'accounting'

amountView = require './amount'

module.exports = ({owee, amount}) ->
  if amount > 0
    span '.verb', 'owes'
    text ' @'
    span '.subject', "#{owee}"
    div '.list-group-link-rhs', ->
      amountView amount: Math.abs(amount)
  else if amount < 0
    text '@'
    span '.subject', "#{owee}"
    span '.verb', ' owes'
    div '.list-group-link-rhs', ->
      amountView amount: Math.abs(amount)
  else
    text '@'
    span '.subject', "#{owee}"
    span '.verb', ' is even'
