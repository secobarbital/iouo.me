{renderable, doctype, html, head, title, meta, link, body, style, script} = require 'teacup'

assets = require '../config/assets'
navbar = require './navbar'

module.exports = renderable ({content, cdnjs, externaljs, inlinejs}) ->
  doctype 5
  html ->
    head ->
      meta charset: 'utf-8'
      title 'iouo.me'
      meta name: 'description', content: 'Why pay when you can owe?'
      meta name: 'viewport', content: 'width=device-width, initial-scale=1'
      assets.favicons()
      assets.styles()
      assets.headjs cdnjs: cdnjs, externaljs: externaljs, inlinejs: inlinejs
      assets.gajs()
    body ->
      navbar()
      content()
