$(document).on 'mobileinit', ->
  $.mobile.defaultPageTransition = 'slide'
.on 'pageinit', '.ledger', (e) ->
  $('time', e.target).timeago()
.on 'pageinit', '#owe-someone', (e) ->
  $('form', e.target).on 'submit', (e) ->
    e.preventDefault()
    e.stopPropagation()
    owee = $('[name=owee]', e.target).val()
    amount = $('[name=amount]', e.target).val()
    if owee && amount
      window.location = "https://twitter.com/intent/tweet?text=#{escape("#{owee} #iou #{amount}")}"
