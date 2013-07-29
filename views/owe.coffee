{renderable, div, form, label, input, h1, a, text, script} = require 'teacup'

layout = require './layout'

module.exports = renderable ({xhr}) -> layout xhr: xhr, content: ->
  div '#owe-someone', data: role: 'page', ->
    div data: role: 'header', ->
      a href: '/', data: icon: 'delete', rel: 'back', ->
        text 'Cancel'
      h1 'Owe Someone'
    div data: role: 'content', ->
      form action: 'https://twitter.com/intent/tweet', ->
        input name: 'text', type: 'hidden'
        label for: 'owee', 'Twitter screen name:'
        input '#owee', type: 'text'
        label for: 'amount', 'Amount'
        input '#amount', type: 'number'
        input type: 'submit', value: 'Tweet It'

  script '''
    $('form').on('submit', function(e) {
      var owee = $('#owee', e.target).val();
      var amount = $('#amount', e.target).val();
      if (owee && amount) {
        $('[name=text]').val('@' + owee + ' #iou $' + amount);
      }
    });
  '''
