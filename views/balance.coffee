{renderable, a, span} = require 'teacup'
accounting = require 'accounting'

module.exports = renderable ({owee, amount}) ->
  if amount > 0
    span '.verb', 'owes '
    span '.subject', "@#{owee}"
    span '.amount', accounting.formatMoney Math.abs(amount), '$ '
  else if amount < 0
    span '.subject', "@#{owee}"
    span '.verb', ' owes'
    span '.amount', accounting.formatMoney Math.abs(amount), '$ '
  else
    span '.subject', "@#{owee}"
    span '.verb', ' is even'
