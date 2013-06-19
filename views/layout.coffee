{renderable, doctype, html, head, title, meta, link, body, style, script} = require 'teacup'

module.exports = renderable ({content, xhr}) ->
  doctype 5
  html ->
    if xhr
      head ->
        script '''
          if (!window.jQuery) {
            window.location.reload();
          }
        '''
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
          $(document).on('pageinit', '.ledger', function(e) {
            $('time', e.target).timeago();
          }).on('pageinit', '#owe-someone', function(e) {
            $('form', e.target).on('submit', function(e) {
              var owee = $('#owee', e.target).val();
              var amount = $('#amount', e.target).val();
              if (owee && amount) {
                $('[name=text]').val('@' + owee + ' #iou $' + amount);
              }
            });
          });
        '''
