{renderable, doctype, html, head, title, meta, link, body, script} = require 'teacup'

module.exports = renderable ({content}) ->
  doctype 5
  html ->
    head ->
      title 'I owe U owe Me'
      meta name: 'viewport', content: 'width=device-width, initial-scale=1'
      link rel: 'apple-touch-icon', href: '/images/iou-logo.png'
      link rel: 'apple-touch-icon-precomposed', href: '/images/iou-logo.png'
      link rel: 'stylesheet', href: 'http://code.jquery.com/mobile/1.3.0/jquery.mobile-1.3.0.min.css'
      link rel: 'stylesheet', href: '/stylesheets/iou.css'
      script src: 'http://code.jquery.com/jquery-1.9.1.min.js', ''
      script src: '//cdnjs.cloudflare.com/ajax/libs/jquery-timeago/1.1.0/jquery.timeago.min.js', ''
      script src: '/javascripts/iou.js', ''
      script src: 'http://code.jquery.com/mobile/1.3.0/jquery.mobile-1.3.0.min.js', ''
    body ->
      content()
