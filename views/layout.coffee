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
      link rel: 'stylesheet', href: '/css/bootstrap.min.css'
      style type: 'text/css', '''
        .subject {
          font-weight: bold;
        }
        .amount {
          float: right;
          font-size: 1.3em;
          font-family: Georgia, Palatino, serif;
          line-height: 1;
        }
        .panel-heading {
          margin-bottom: 0;
        }
        .panel .list-group {
          margin-top: 0;
        }
        section, footer {
          padding-left: 10px;
          padding-right: 10px;
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
        });

        $(function() {
          $('time').timeago();
        });
      '''
