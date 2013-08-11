{renderable, header, section, div, span, form, fieldset, legend, label, input, button, a, text} = require 'teacup'

layout = require './layout'

module.exports = renderable ({xhr}) -> layout xhr: xhr, content: ->
  header '.navbar', ->
    a '.navbar-brand', href: '/', 'iouo.me'
  section ->
    form action: 'https://twitter.com/intent/tweet', ->
      input name: 'text', type: 'hidden'
      fieldset ->
        legend 'Owe someone'
        div '.form-group', ->
          label for: 'owee', 'Twitter screen name'
          div '.input-group', ->
            span '.input-group-addon', '@'
            input '#owee.form-control', type: 'text'
        div '.form-group', ->
          label for: 'amount', 'Amount'
          div '.input-group', ->
            span '.input-group-addon', '$'
            input '#amount.form-control', type: 'number'
        button '.btn.btn-default', type: 'submit', 'Tweet It'
