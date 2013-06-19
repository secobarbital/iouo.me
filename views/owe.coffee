{renderable, div, form, label, input, h1, a, text} = require 'teacup'

layout = require './layout'

module.exports = renderable -> layout content: ->
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
