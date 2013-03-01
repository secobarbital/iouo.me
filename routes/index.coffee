IOU = require '../models/iou'

exports.index = (req, res, next) ->
  IOU.searchTwitter (err) ->
    console.log "Error searching Twitter for IOUs: #{err}"
  IOU.balances (err, balances) ->
    return next err if err
    res.render 'index', balances: balances.filter (balance) ->
      balance.value > 0

exports.ledger = (req, res, next) ->
  IOU.ledger req.params.ower, req.params.owee, (err, txns) ->
    return next err if err
    res.render 'ledger', txns: txns
