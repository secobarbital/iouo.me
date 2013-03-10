$(document).on
  mobileinit: ->
    $.mobile.defaultPageTransition = 'slide'
  pageinit: ->
    $('time').timeago()
