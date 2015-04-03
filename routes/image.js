var express = require('express');
var url = require('url');

var cloudName = url.parse(process.env.CLOUDINARY_URL).hostname;
var router = express.Router();

router.get('/twitter/*', function(req, res, next) {
  res.redirect(`http://res.cloudinary.com/${cloudName}/image${req.path}`);
});

module.exports = router;
