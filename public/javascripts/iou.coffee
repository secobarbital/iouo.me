tweet = (href) ->
  if ~navigator.userAgent.indexOf(' Mobile') && ~navigator.userAgent.indexOf(' AppleWebKit')
    params = href.split('?', 2)[1].split('&').reduce (m, kv) ->
      [k, v] = kv.split('=')
      m[k] = v
      m
    , {}
    setTimeout ->
      if document.webkitHidden
        window.location.reload()
      else
        window.location = href
    , 300
    window.location = "twitter://post?message=#{params.text}"

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
      tweet "https://twitter.com/intent/tweet?text=#{escape("#{owee} #iou #{amount}")}"
.on 'click', 'a[href*="twitter.com/intent/tweet"]', (e) ->
  e.preventDefault() if tweet e.currentTarget.href
