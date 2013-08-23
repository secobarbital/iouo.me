$(function() {
  $('#owe-someone').on('submit', 'form', function(e) {
    var owee = $('#owee', e.target).val();
    var amount = $('#amount', e.target).val();
    if (owee && amount) {
      $('[name=text]').val('@' + owee + ' #iou $' + amount);
    }
  });

  $('time').timeago();
});
