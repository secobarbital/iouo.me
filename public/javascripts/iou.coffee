$(document).on 'mobileinit', ->
  $.mobile.defaultPageTransition = 'slide'
.on 'pageinit', '.ledger', ->
  $('time').timeago()
.on 'pageinit', '#owe-someone', ->
  $('form', @).on 'submit', (e) ->
    e.preventDefault()
    owee = $('[name=owee]').val()
    amount = $('[name=amount]').val()
    if owee && amount
      window.location = "https://twitter.com/intent/tweet?text=#{escape("#{owee} #iou #{amount}")}"
