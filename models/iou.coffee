db = require '../config/db'
twitter = require '../config/twitter'

IOU = exports

IOU.searchTwitter = (cb) ->
  db.view 'iouome', 'by_raw_id', descending: true, limit: 1, (err, res) ->
    return cb err if err
    params =
      q: '#iou'
      result_type: 'recent'
      count: 100
      include_entities: true
    params.since_id = res.rows[0].key if res.rows.length
    twitter.get 'search/tweets', params, (err, data) ->
      return cb err if err
      data.statuses.forEach processTweet cb

IOU.balances = (cb) ->
  db.view 'iouome', 'balances', group_level: 2, (err, res) ->
    cb err, res && res.rows

processTweet = (cb) ->
  (tweet) ->
    doc =
      id: "twitter/#{tweet.id_str}"
      raw: tweet
      ower: tweet.user.id_str
      owee: tweet.in_reply_to_user_id_str
      amount: extractAmount tweet.text
    if doc.ower && doc.owee && doc.amount
      db.insert doc, (err) ->
        return cb err if err
        cb()

extractAmount = (text) ->
  words = text.toLowerCase().split(/\s+/)
  words = words.slice(words.indexOf('#iou') + 1)
  for word in words
    word = word.substr(1) unless word.indexOf('$')
    return parseFloat(m[1]) if m = word.match /^[.\d]+$/

