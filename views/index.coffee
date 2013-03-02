{renderable, ul, li, a, strong, text} = require 'teacup'

layout = require './layout'

module.exports = renderable ({balances}) -> layout content: ->
  ul data: role: 'listview', ->
    balances.forEach (balance, i) ->
      [ower, owee] = balance.key
      amount = balance.value
      li data: role: 'list-divider', "@#{ower} owes" unless i && ower == balances[i-1].key[0]
      li ->
        a href: "/transactions/#{ower}/#{owee}", ->
          text "@#{owee}"
          strong '.ui-li-aside', "$#{amount}"
