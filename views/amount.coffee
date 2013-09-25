{span} = require 'teacup'
accounting = require 'accounting'

module.exports = ({amount}) ->
  span '.currency', '$ '
  span '.amount', accounting.formatMoney Math.abs(amount), ''
