{renderable, doctype, html, head, title, meta, link, body, style, script, coffeescript} = require 'teacup'

module.exports = renderable ({content}) ->
  doctype 5
  html ->
    head ->
      title 'I owe U owe Me'
      meta name: 'viewport', content: 'width=device-width, initial-scale=1'
      link rel: 'stylesheet', href: 'http://code.jquery.com/mobile/1.3.0/jquery.mobile-1.3.0.min.css'
      style '''
        img.logo {
          float: left;
        }
      '''
      script src: 'http://code.jquery.com/jquery-1.9.1.min.js', ''
      script src: 'http://code.jquery.com/mobile/1.3.0/jquery.mobile-1.3.0.min.js', ''
    body ->
      content()
      script src: '//cdnjs.cloudflare.com/ajax/libs/jquery-timeago/1.1.0/jquery.timeago.min.js', ''
      coffeescript ->
        tweet = (href) ->
          ua = navigator.userAgent
          if ~ua.indexOf(' Mobile') && ~ua.indexOf(' AppleWebKit') && (~ua.indexOf(' Chrome') || !~ua.indexOf(' Android'))
            params = href.split('?', 2)[1].split('&').reduce (m, kv) ->
              [k, v] = kv.split('=')
              m[k] = v
              m
            , {}
            setTimeout ->
              if document.webkitHidden
                window.location.reload()
              else
                window.location = href
            , 300
            window.location = "twitter://post?message=#{params.text}"

        $(document).on 'mobileinit', ->
          $.mobile.defaultPageTransition = 'slide'
        .on 'pageinit', '.ledger', (e) ->
          $('time', e.target).timeago()
          twttr?.widgets?.load()
        .on 'pageinit', '#owe-someone', (e) ->
          $('form', e.target).on 'submit', (e) ->
            e.preventDefault()
            e.stopPropagation()
            owee = $('[name=owee]', e.target).val()
            amount = $('[name=amount]', e.target).val()
            if owee && amount
              tweet "https://twitter.com/intent/tweet?text=#{escape("#{owee} #iou #{amount}")}"
        .on 'click', 'a[href*="twitter.com/intent/tweet"]', (e) ->
          e.preventDefault() if tweet e.currentTarget.href
