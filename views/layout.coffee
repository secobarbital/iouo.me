{renderable, doctype, html, head, meta, title, link, script, body, div, h1, h4} = require 'teacup'

module.exports = renderable ({content}) ->
  doctype 5
  html ->
    head ->
      meta name: 'viewport', content: 'width=device-width, initial-scale=1'
      title 'I owe you owe me'
      link rel: 'stylesheet', href: '/stylesheets/jquery.mobile-1.3.0.min.css'
      script src: '/javascripts/jquery-1.9.1.min.js', ''
      script src: '/javascripts/jquery.mobile-1.3.0.min.js', ''
    body ->
      div data: role: 'page', ->
        div data: role: 'header', ->
          h1 'I owe You'
        div data: role: 'content', ->
          content()
        div data: role: 'footer', ->
          h4 'You owe Me'
