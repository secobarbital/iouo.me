{renderable, doctype, html, head, title, meta, link, body, style, script} = require 'teacup'

module.exports = renderable ({content}) ->
  doctype 5
  html manifest: '/index.appcache', ->
    head ->
      meta charset: 'utf-8'
      title 'iouo.me'
      meta name: 'description', content: 'Why pay when you can owe?'
      meta name: 'HandheldFriendly', content: 'True'
      meta name: 'MobileOptimized', content: '320'
      meta name: 'viewport', content: 'width=device-width, initial-scale=1'
      meta 'http-equiv': 'cleartype', content: 'on'

      meta name: 'apple-mobile-web-app-capable', content: 'yes'
      meta name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent'
      meta name: 'apple-mobile-web-app-title', content: 'iouo.me'

      link rel: 'stylesheet', href: '//cdnjs.cloudflare.com/ajax/libs/normalize/2.1.0/normalize.css'
      link rel: 'stylesheet', href: '/main.css'

      style type: 'text/css', '''
      '''
    body ->
      content()
      script src: '//cdnjs.cloudflare.com/ajax/libs/jquery/2.0.3/jquery.min.js', ''
      script src: '//cdnjs.cloudflare.com/ajax/libs/jquery-timeago/1.1.0/jquery.timeago.min.js', ''
      script '''
        $(document).on('click', '.refresh', function(e) {
          e.preventDefault();
          window.applicationCache ? applicationCache.update() : location.reload();
        });

        $(applicationCache).on('checking', function() {
          $('.loading').show();
        }).on('updateready', function() {
          location.reload();
        }).on('cached error noupdate obsolete', function() {
          $('.loading').hide();
        }).on('noupdate', function() {
          $('time.freshness').timeago('update', new Date().toISOString());
        });

        $(function() {
          $('time').timeago();
        });
      '''
