accounting = require 'accounting'
{renderable, header, footer, section, div, span, form, label, input, h1, h4, ul, li, a, img, strong, text} = require 'teacup'

layout = require './layout'
refreshButton = require './refresh_button'

module.exports = renderable ({balances, ower, total, xhr}) -> layout xhr: xhr, content: ->
  header '.navbar', ->
    a '.navbar-brand', href: '/', "@#{ower}"
  section ->
    div '.list-group', ->
      balances.forEach (balance) ->
        [ower, owee] = balance.key
        amount = balance.value.toFixed 2
        verb = if amount < 0 then 'owes' else 'is owed'
        a '.list-group-item', href: "/transactions/#{ower}/#{owee}", ->
          span '.subject', "@#{owee}"
          span '.verb', " #{verb} "
          span '.amount', accounting.formatMoney Math.abs(amount), '$ '
    footer ->
      a '.btn.btn-primary.btn-lg.btn-block', href: "https://twitter.com/intent/tweet?text=#{escape("@#{ower} #iou $")}", "Owe @#{ower}"
