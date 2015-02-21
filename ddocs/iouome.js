module.exports = {
  _id: '_design/iouome',
  views: {
    by_raw_id: {
      map: function(doc) {
        if (doc.raw && doc.raw.id_str) emit(doc.raw.id_str);
      }
    },
    balances: {
      map: function(doc) {
        var ower, owee, amount, via;

        if (doc.ower && doc.owee && doc.amount) {
          ower = doc.ower.username || doc.raw.user.screen_name;
          owee = doc.owee.username || doc.raw.in_reply_to_screen_name;
          amount = doc.amount;
          if (doc.via) {
            via = doc.via.username
            emit([ower, via], amount);
            emit([via, owee], amount);
            emit([via, ower], -amount);
            emit([owee, via], -amount);
          } else {
            emit([ower, owee], amount);
            emit([owee, ower], -amount);
          }
        }
      },
      reduce: '_sum'
    },
    stats: {
      map: function(doc) {
        var ower, amount;

        if (doc.ower && doc.amount) {
          ower = doc.ower.username || doc.raw.user.screen_name;
          amount = doc.amount;
          emit(ower, amount);
        }
      },
      reduce: '_stats'
    }
  }
}
