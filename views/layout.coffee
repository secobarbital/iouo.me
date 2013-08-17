{renderable, doctype, html, head, title, meta, link, body, style, script} = require 'teacup'

piler = require '../config/piler'

module.exports = renderable ({content}) ->
  doctype 5
  html ->
    head ->
      meta charset: 'utf-8'
      title 'iouo.me'
      meta name: 'description', content: 'Why pay when you can owe?'
      meta name: 'apple-mobile-web-app-capable', content: 'yes'
      meta name: 'apple-mobile-web-app-status-bar-style', content: 'black'
      meta name: 'apple-mobile-web-app-title', content: 'iouo.me'
      meta name: 'viewport', content: 'width=device-width, initial-scale=1'
      console.log 'renderTags'
      piler.css.renderTags()
    body ->
      content()
      piler.js.renderTags()
