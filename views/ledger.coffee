{renderable, doctype, html, head, meta, title, link, script, body, div, ul, li, a} = require 'teacup'

module.exports = renderable ({txns}) ->
  doctype 5
  html ->
    head ->
      meta name: 'viewport', content: 'width=device-width, initial-scale=1'
      title 'I owe you owe me'
      link rel: 'stylesheet', href: '/stylesheets/jquery.mobile-1.3.0.min.css'
      script src: '/javascripts/jquery-1.9.1.min.js', ''
      script src: '/javascripts/jquery.mobile-1.3.0.min.js', ''
    body ->
      div 'data-role': 'content', ->
        ul 'data-role': 'listview', ->
          txns.forEach (txn) ->
            tweet = txn.doc.raw
            li ->
              a href: "http://twitter.com/#{tweet.user.id_str}/status/#{tweet.id_str}", "@#{tweet.user.screen_name}: #{tweet.text}"
