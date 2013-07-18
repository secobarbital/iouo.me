{renderable, doctype, html, head, title, meta, link, body, style, script} = require 'teacup'

module.exports = renderable ({content, xhr}) ->
  doctype 5
  html manifest: '/index.appcache', ->
    if xhr
      head ->
        script '''
          if (!jQuery) {
            location.reload();
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
        link rel: 'stylesheet', href: '//cdnjs.cloudflare.com/ajax/libs/jquery-mobile/1.3.1/jquery.mobile.min.css'
        script src: '//cdnjs.cloudflare.com/ajax/libs/jquery/2.0.3/jquery.min.js', ''
        script '''
          $(document).on('mobileinit', function() {
            $.mobile.defaultPageTransition = 'slide';
          });
        '''
        script src: '//cdnjs.cloudflare.com/ajax/libs/jquery-mobile/1.3.1/jquery.mobile.min.js', ''
      body ->
        content()
        script src: '//cdnjs.cloudflare.com/ajax/libs/jquery-timeago/1.1.0/jquery.timeago.min.js', ''
        script '''
          $(document).on('pageinit', function(e) {
            $('time', e.target).timeago();
          }).on('pageinit', '#owe-someone', function(e) {
            $('form', e.target).on('submit', function(e) {
              var owee = $('#owee', e.target).val();
              var amount = $('#amount', e.target).val();
              if (owee && amount) {
                $('[name=text]').val('@' + owee + ' #iou $' + amount);
              }
            });
          }).on('click', '.refresh', function() {
            applicationCache ? applicationCache.update() : location.reload();
          });
          $(applicationCache).on('checking', function() {
            $.mobile.loading('show');
          }).on('updateready', function() {
            applicationCache.swapCache();
            location.reload();
          }).on('cached error noupdate obsolete', function() {
            $.mobile.loading('hide');
          }).on('noupdate', function() {
            $('time.freshness').html('&#8203;').removeData('timeago').attr('datetime', new Date().toISOString());
          }).on('error obsolete', function() {
            $('time.freshness').timeago();
          });
        '''
