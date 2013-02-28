{renderable, doctype, html, head, body, title, text, ul, li} = require 'teacup'

module.exports = renderable ({balances}) ->
  doctype 5
  html ->
    head ->
      title 'I owe you owe me'
    body ->
      ul ->
        for balance in balances
          [ower, owee] = balance.key
          amount = balance.value
          if amount > 0
            li ->
              text "#{ower} owes #{owee} #{amount}"
