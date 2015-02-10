var assign = require('object-assign');
var { fromJS } = require('immutable');

var Store = require('./Store');

var _transactions = fromJS({
  "secobarbital": {
    "choonhongpeck": [
      {"_id":"twitter/532783099466117120","_rev":"1-aaa5a6215d25aa16f3b726191b096b56","raw":{"metadata":{"iso_language_code":"in","result_type":"recent"},"created_at":"Thu Nov 13 06:32:44 +0000 2014","id":532783099466117100,"id_str":"532783099466117120","text":"@choonhongpeck #iou $98 at Mokutanya","source":"<a href=\"https://dev.twitter.com/docs/tfw\" rel=\"nofollow\">Twitter for Websites</a>","truncated":false,"in_reply_to_status_id":null,"in_reply_to_status_id_str":null,"in_reply_to_user_id":5666482,"in_reply_to_user_id_str":"5666482","in_reply_to_screen_name":"choonhongpeck","user":{"id":14204826,"id_str":"14204826","name":"Seggy Umboh","screen_name":"secobarbital","location":"Los Altos, CA","profile_location":null,"description":"","url":"http://t.co/f3pI7U2u3S","entities":{"url":{"urls":[{"url":"http://t.co/f3pI7U2u3S","expanded_url":"http://www.iouo.me/","display_url":"iouo.me","indices":[0,22]}]},"description":{"urls":[]}},"protected":false,"followers_count":186,"friends_count":223,"listed_count":8,"created_at":"Mon Mar 24 01:52:27 +0000 2008","favourites_count":3,"utc_offset":-28800,"time_zone":"Pacific Time (US & Canada)","geo_enabled":true,"verified":false,"statuses_count":911,"lang":"en","contributors_enabled":false,"is_translator":false,"is_translation_enabled":false,"profile_background_color":"C0DEED","profile_background_image_url":"http://abs.twimg.com/images/themes/theme1/bg.png","profile_background_image_url_https":"https://abs.twimg.com/images/themes/theme1/bg.png","profile_background_tile":false,"profile_image_url":"http://pbs.twimg.com/profile_images/52018731/seggy_normal.jpg","profile_image_url_https":"https://pbs.twimg.com/profile_images/52018731/seggy_normal.jpg","profile_link_color":"0084B4","profile_sidebar_border_color":"C0DEED","profile_sidebar_fill_color":"DDEEF6","profile_text_color":"333333","profile_use_background_image":true,"default_profile":true,"default_profile_image":false,"following":false,"follow_request_sent":false,"notifications":false},"geo":null,"coordinates":null,"place":null,"contributors":null,"retweet_count":0,"favorite_count":0,"entities":{"hashtags":[{"text":"iou","indices":[15,19]}],"symbols":[],"user_mentions":[{"screen_name":"choonhongpeck","name":"Choon Hong Peck","id":5666482,"id_str":"5666482","indices":[0,14]}],"urls":[]},"favorited":false,"retweeted":false,"lang":"in"},"ower":{"provider":"twitter","id":"14204826","username":"secobarbital","displayName":"Seggy Umboh"},"owee":{"provider":"twitter","id":"5666482","username":"choonhongpeck","displayName":"Choon Hong Peck"},"amount":98}
    ]
  }
});

var TransactionStore = assign({}, Store, {
  get: function(ower, owee) {
    return _transactions.getIn([ower, owee]);
  },

  getAll: function() {
    return _transactions;
  }
});

module.exports = TransactionStore;
