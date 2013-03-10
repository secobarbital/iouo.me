{renderable, doctype, html, head, title, meta, link, body, script} = require 'teacup'

module.exports = renderable ({content}) ->
  doctype 5
  html ->
    head ->
      title 'i owe you owe me'
      meta name: 'viewport', content: 'width=device-width, initial-scale=1'
      link rel: 'stylesheet', href: '/stylesheets/jquery.mobile-1.3.0.min.css'
      link rel: 'stylesheet', href: '/stylesheets/style.css'
      script src: '/javascripts/jquery-1.9.1.min.js', ''
      script src: '/javascripts/jquery.mobile-1.3.0.min.js', ''
      script src: '/javascripts/jquery.timeago.js', ''
      script src: '/javascripts/iou.js', ''
    body ->
      content()
