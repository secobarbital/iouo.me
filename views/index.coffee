{renderable, doctype, html, head, title, link, script, body, text, ul, li} = require 'teacup'

module.exports = renderable ({balances}) ->
  doctype 5
  html ->
    head ->
      title 'I owe you owe me'
      link rel: 'stylesheet', href: 'stylesheets/jquery.mobile-1.3.0.min.css'
      script src: 'javascripts/jquery-1.9.1.min.js', ''
      script src: 'javascripts/jquery.mobile-1.3.0.min.js', ''
    body ->
      ul 'data-role': 'listview', ->
        balances = balances.filter (balance) ->
          balance.value > 0
        balances.forEach (balance, i) ->
          [ower, owee] = balance.key
          amount = balance.value
          li('data-role': 'list-divider', "@#{ower}") unless i && ower == balances[i-1].key[0]
          li ->
            text "owes @#{owee} $#{amount}"
