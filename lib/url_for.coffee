exports.owe = (owee) ->
  "https://twitter.com/intent/tweet?text=#{escape("@#{owee} #iou $")}"
