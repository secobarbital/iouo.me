{renderable, doctype, html, head, title, meta, link, body, style, script} = require 'teacup'

module.exports = renderable ({content, xhr}) ->
  doctype 5
  html manifest: '/manifest.appcache', ->
    head ->
      meta charset: 'utf-8'
      title 'iouo.me'
      meta name: 'viewport', content: 'initial-scale=1, maximum-scale=1, user-scalable=no'
      meta name: 'apple-mobile-web-app-capable', content: 'yes'
      meta name: 'apple-mobile-web-app-status-bar-style', content: 'black'
      meta name: 'apple-mobile-web-app-title', content: 'iouo.me'
      link rel: 'stylesheet', href: '//cdnjs.cloudflare.com/ajax/libs/ratchet/1.0.1/ratchet.min.css'
      style type: 'text/css', '''
        .updated {
          display: none;
          text-align: center;
        }
        #balances .subject {
          font-weight: bold;
        }
        #balances .amount {
          font-family: Georgia, Palatino, serif;
          font-weight: bold;
        }
        #balances .object {
          float: right;
          margin-right: -30px;
        }
        .content > .button-block {
          margin-left: 10px;
          margin-right: 10px;
        }
        .content > form {
          margin: 10px;
        }
      '''
    body ->
      content()
      script src: '//cdnjs.cloudflare.com/ajax/libs/jquery/2.0.3/jquery.min.js', ''
      script src: '//cdnjs.cloudflare.com/ajax/libs/jquery-timeago/1.1.0/jquery.timeago.min.js', ''
      #script src: '//cdnjs.cloudflare.com/ajax/libs/ratchet/1.0.1/ratchet.min.js', ''
      script src: '/ratchet.js'
      script '''
        $(document).on('submit', '#owe-someone form', function(e) {
          var owee = $('#owee', e.target).val().replace('@', '');
          var amount = $('#amount', e.target).val();
          if (owee && amount) {
            $('[name=text]', e.target).val('@' + owee + ' #iou $' + amount);
          }
        }).on('click', 'a.submit', function(e) {
          $(e.target).closest('form').submit();
        });
        $(applicationCache).on('checking', function() {
          $('.updating').text('Checking for update...');
          $('.updated').slideDown();
        }).on('updateready', function() {
          $('.updating').text('Updating...');
          setTimeout(function() { location.reload() }, 1000);
        }).on('cached error obsolete', function() {
          $('.updating').text('');
        }).on('noupdate', function() {
          $('.updated').slideUp();
        });
        $(function() {
          $('time').timeago();
        });
      '''
