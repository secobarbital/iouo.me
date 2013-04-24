{renderable, doctype, html, head, title, meta, link, body, style, script} = require 'teacup'

module.exports = renderable ({content, xhr}) ->
  doctype 5
  html ->
    if xhr
      body ->
        content()
    else
      head ->
        title 'I owe U'
        meta name: 'viewport', content: 'width=device-width, initial-scale=1'
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
        '''
        link rel: 'stylesheet', href: 'http://code.jquery.com/mobile/1.3.1/jquery.mobile-1.3.1.min.css'
        script src: 'http://code.jquery.com/jquery-2.0.0.min.js', ''
        script '''
          $(document).on('mobileinit', function() {
            $.mobile.defaultPageTransition = 'slide';
          });
        '''
        script src: 'http://code.jquery.com/mobile/1.3.1/jquery.mobile-1.3.1.min.js', ''
      body ->
        content()
        script src: '//cdnjs.cloudflare.com/ajax/libs/jquery-timeago/1.1.0/jquery.timeago.min.js', ''
        script '''
          function tweet(href) {
            var params, ua = navigator.userAgent;
            if (~ua.indexOf(' Mobile') && ~ua.indexOf(' AppleWebKit') && (~ua.indexOf(' Chrome') || !~ua.indexOf(' Android'))) {
              params = href.split('?', 2)[1].split('&').reduce(function(m, kv) {
                var pair = kv.split('=');
                m[pair[0]] = pair[1];
                return m;
              }, {});
              setTimeout(function() {
                if (document.webkitHidden) {
                  window.location.reload();
                } else {
                  window.location = href;
                }
              }, 300);
              window.location = 'twitter://post?message=' + params.text;
              return true;
            } else {
              return false;
            }
          }
          $(document).on('pageinit', '.ledger', function(e) {
            $('time', e.target).timeago();
          }).on('pageinit', '#owe-someone', function(e) {
            $('form', e.target).on('submit', function(e) {
              e.preventDefault();
              e.stopPropagation();
              owee = $('[name=owee]', e.target).val();
              amount = $('[name=amount]', e.target).val();
              if (owee && amount) {
                tweet('https://twitter.com/intent/tweet?text=' + escape('@' + owee + ' #iou $' + amount));
              }
            });
          }).on('click', 'a[href*="twitter.com/intent/tweet"]', function(e) {
            if (tweet(e.currentTarget.href)) {
              e.preventDefault();
            }
          });
        '''
