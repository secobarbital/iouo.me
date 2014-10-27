var fs = require('fs');
var prologue;
var epilogue;

fs.readFile(__dirname + '/../app/layout.html', { encoding: 'utf8' }, function(err, layout) {
    if (err) throw err;
    var splits = layout.split('BODY');
    prologue = exports.prologue = splits[0];
    epilogue = exports.epilogue = splits[1];
});
