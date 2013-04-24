IOU = require '../models/iou'

exports.index = (req, res, next) ->
  IOU.searchTwitter (err) ->
    console.log "Error searching Twitter for IOUs: #{err}" if err
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
