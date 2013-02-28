IOU = require '../models/iou'

exports.index = (req, res, next) ->
  IOU.searchTwitter (err) ->
    console.log "Error searching Twitter for IOUs: #{err}"
  IOU.balances (err, balances) ->
    console.log balances
    return next err if err
    res.render 'index', balances: balances
