$.cachedScript = (url, options) ->
  options = $.extend options || {},
    dataType: 'script'
    cache: true
    url: url
  $.ajax options

$(document).on 'mobileinit', ->
  $.mobile.defaultPageTransition = 'slide'
.on 'pageinit', '.ledger', (e) ->
  $('time', e.target).timeago()
  twttr?.widgets?.load()
.on 'pageinit', '#owe-someone', (e) ->
  $('form', e.target).on 'submit', (e) ->
    e.preventDefault()
    e.stopPropagation()
    owee = $('[name=owee]', e.target).val()
    amount = $('[name=amount]', e.target).val()
    if owee && amount
      window.location = "https://twitter.com/intent/tweet?text=#{escape("#{owee} #iou #{amount}")}"

$ ->
  $.cachedScript '//platform.twitter.com/widgets.js'
