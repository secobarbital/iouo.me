{renderable, div, form, header, label, input, h1, a, button, text} = require 'teacup'

layout = require './layout'

module.exports = renderable ({xhr}) -> layout xhr: xhr, content: ->
  header '.bar-title', ->
    a '.button-prev', href: '/', ->
      text 'iouo.me'
    h1 '.title', ->
      text 'Owe someone'
    a '.button-next', href: '#', ->
      text 'Next'
  div '#owe-someone.content', ->
    form action: 'https://twitter.com/intent/tweet', ->
      div '.input-group', ->
        div '.input-row', ->
          label for: 'owee', 'Screen Name'
          input '#owee', type: 'text'
        div '.input-row', ->
          label for: 'amount', 'Amount'
          input '#amount', type: 'number'
      a '.button-main.button-block.submit', 'Tweet It'
      input name: 'text', type: 'hidden'
