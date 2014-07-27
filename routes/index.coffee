_ = require 'lodash'
url = require 'url'

IOU = require '../models/iou'
manifestTemplate = require('../views/manifest').template

_.extend exports, require './roulette'

exports.manifest = (req, res, next) ->
  IOU.latest (err, version) ->
    return next err if err
    res.send manifestTemplate.replace '$version', version

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

exports.ping = (req, res) ->
  IOU.searchTwitter (err) ->
    if err
      res.send 502, err
    else
      res.send 200

exports.index = (req, res, next) ->
  IOU.balances (err, balances) ->
    return next err if err
    res.render 'index',
      balances: balances.filter (balance) -> balance.value

exports.balances = (req, res, next) ->
  IOU.balancesFor req.params.ower, (err, balances) ->
    return next err if err
    balances = balances.filter (balance) -> balance.value
    total = balances.reduce (a, b) ->
      a + b.value
    , 0
    res.render 'balances',
      balances: balances
      ower: req.params.ower
      total: total

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

exports.owe = (req, res, next) ->
  res.render 'owe'

parseTweetIdFromReferer = (referer) ->
  if referer && !referer.indexOf 'https://twitter.com/intent/tweet/complete?'
    url.parse(referer, true).query.latest_status_id
