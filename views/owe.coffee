{renderable, div, form, label, input, h1, a, text} = require 'teacup'

layout = require './layout'

module.exports = renderable -> layout content: ->
  div '#owe-someone', data: role: 'page', ->
    div data: role: 'header', ->
      h1 'Owe Someone'
    div data: role: 'content', ->
      form ->
        label for: 'owee', 'Twitter screen name:'
        input type: 'text', name: 'owee'
        label for: 'amount', 'Amount'
        input type: 'number', name: 'amount'
        input type: 'submit', value: 'Tweet It'
