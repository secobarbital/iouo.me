{renderable, doctype, html, head, title, meta, link, body, style, script} = require 'teacup'

module.exports = renderable ({content, xhr}) ->
  doctype 5
  html ->
    head ->
      meta charset: 'utf-8'
      title 'iouo.me'
      meta name: 'description', content: 'Why pay when you can owe?'
      meta name: 'apple-mobile-web-app-capable', content: 'yes'
      meta name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent'
      meta name: 'apple-mobile-web-app-title', content: 'iouo.me'
      meta name: 'viewport', content: 'width=device-width, initial-scale=1'
      link rel: 'stylesheet', href: '//cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.0.0-rc1/css/bootstrap.min.css'
      style type: 'text/css', '''
        .logotype {
          float: left;
          font-family: Arial;
          display: inline-block;
          margin-left: 8px;
          text-align: center;
          text-shadow: none;
        }
        .logotype-o {
          font-size: 18px;
        }
        .logotype-u {
          font-size: 23px;
          margin-top: -8px;
        }
        .subject {
          font-weight: bold;
        }
        .amount {
          float: right;
          font-size: 1.3em;
          font-family: Georgia, Palatino, serif;
          line-height: 1;
        }
        .freshness {
          display: block;
          text-align: center;
        }
        .list-group {
          margin-left: 10px;
          margin-right: 10px;
        }
        a.list-group-item:after {
          content: "\\203A";
          font-size: 2em;
          font-weight: 100;
          line-height: 1;
          position: absolute;
          right: 12px;
          top: 3px;
        }
      '''
    body ->
      content()
      script src: '//cdnjs.cloudflare.com/ajax/libs/jquery/2.0.3/jquery.min.js', ''
      script src: '//cdnjs.cloudflare.com/ajax/libs/jquery-timeago/1.1.0/jquery.timeago.min.js', ''
      script '''
        $(document).on('submit', '#owe-someone form', function(e) {
          var owee = $('#owee', e.target).val();
          var amount = $('#amount', e.target).val();
          if (owee && amount) {
            $('[name=text]').val('@' + owee + ' #iou $' + amount);
          }
        }).on('click', '.refresh', function(e) {
          e.preventDefault();
          window.applicationCache ? applicationCache.update() : location.reload();
        });

        $(applicationCache).on('checking', function() {
          $.mobile.loading('show');
        }).on('updateready', function() {
          applicationCache.swapCache();
          location.reload();
        }).on('cached error noupdate obsolete', function() {
          $.mobile.loading('hide');
        }).on('noupdate', function() {
          $('time.freshness').timeago('update', new Date().toISOString());
        });

        $(function() {
          $('time').timeago();
        });
      '''
