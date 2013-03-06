{renderable, div, h1, h2, h4, ul, li, a, form, p, strong, time, text, raw, label, input, coffeescript} = require 'teacup'

layout = require './layout'

module.exports = renderable ({amount, owee, ower, txns}) -> layout content: ->
  div data: role: 'page', ->
    div data: role: 'header', ->
      h1 "Owe Someone"
    div data: role: 'content', ->
      form data: ajax: 'false', ->
        label for: 'owee', 'Twitter @screenname'
        input type: 'text', name: 'owee', value: '@'
        label for: 'amount', 'Amount'
        input type: 'text', name: 'amount', value: '$'
        input type: 'submit', value: 'Tweet It'
