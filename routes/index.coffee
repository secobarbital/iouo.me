url = require 'url'

IOU = require '../models/iou'

exports.refresh = (req, res, next) ->
  return next() if req.xhr

  if tweetId = parseTweetIdFromReferer req.get 'referer'
    IOU.fetchTweet tweetId, (err) ->
      console.log "Error fetching tweet #{tweetId}: #{err}" if err
      next()
  else
    IOU.searchTwitter (err) ->
      console.log "Error searching Twitter for IOUs: #{err}" if err
    next()

exports.index = (req, res, next) ->
  IOU.balances (err, balances) ->
    return next err if err
    res.render 'index',
      balances: balances.filter (balance) -> balance.value

exports.balances = (req, res, next) ->
  IOU.balancesFor req.params.ower, (err, balances) ->
    return next err if err
    total = balances.reduce (a, b) ->
      a + b.value
    , 0
    res.render 'balances',
      balances: balances.filter (balance) -> balance.value
      ower: req.params.ower
      total: total
      xhr: req.xhr

exports.transactions = (req, res, next) ->
  IOU.ledger req.params.ower, req.params.owee, (err, txns) ->
    return next err if err
    res.render 'ledger',
      amount: txns.reduce (m, txn) ->
        m += txn.value
      , 0
      owee: req.params.owee
      ower: req.params.ower
      txns: txns
      xhr: req.xhr

exports.owe = (req, res, next) ->
  res.render 'owe',
    xhr: req.xhr

parseTweetIdFromReferer = (referer) ->
  if referer && !referer.indexOf 'https://twitter.com/intent/tweet/complete?'
    url.parse(referer, true).query.latest_status_id
