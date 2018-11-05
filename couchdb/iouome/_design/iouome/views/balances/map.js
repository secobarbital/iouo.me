function (doc) {
  var ower, owee, amount, via;

  if (doc.ower && doc.owee && doc.amount) {
    ower = doc.ower.username || doc.raw.user.screen_name;
    owee = doc.owee.username || doc.raw.in_reply_to_screen_name;
    amount = doc.amount;
    ts = doc.raw.created_at && Date.parse(doc.raw.created_at)
    if (doc.via) {
      via = doc.via.username
      emit([ower, via, ts], amount);
      emit([via, owee, ts], amount);
      emit([via, ower, ts], -amount);
      emit([owee, via, ts], -amount);
    } else {
      emit([ower, owee, ts], amount);
      emit([owee, ower, ts], -amount);
    }
  }
}
