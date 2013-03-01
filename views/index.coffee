{renderable, doctype, html, head, meta, title, link, script, body, div, ul, li, text} = require 'teacup'

module.exports = renderable ({balances}) ->
  doctype 5
  html ->
    head ->
      meta name: 'viewport', content: 'width=device-width, initial-scale=1'
      title 'I owe you owe me'
      link rel: 'stylesheet', href: 'stylesheets/jquery.mobile-1.3.0.min.css'
      script src: 'javascripts/jquery-1.9.1.min.js', ''
      script src: 'javascripts/jquery.mobile-1.3.0.min.js', ''
    body ->
      div 'data-role': 'content', ->
        ul 'data-role': 'listview', ->
          balances.forEach (balance, i) ->
            [ower, owee] = balance.key
            amount = balance.value
            li('data-role': 'list-divider', "@#{ower}") unless i && ower == balances[i-1].key[0]
            li ->
              text "owes @#{owee} $#{amount}"
