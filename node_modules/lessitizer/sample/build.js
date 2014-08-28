var lessitizer = require('..');
var path = require('path');
var filePath = function (f) {
    return path.join(__dirname, 'less', f + '.less');
};
var done = function (err, files) {
    console.log('LESSITIZER');
    console.log('==============');
    console.log(err ? err.split('\n').slice(0, -1).join('\n') : 'Done building:');
    console.log(files.join('\n'));
    console.log('==============\n\n');
};

// Build multiples files to a directory
lessitizer({
    files: ['app', 'theme/theme'].map(filePath),
    outputDir: __dirname + '/css'
}, done);

// app-combined.less uses less's @import to
//  include the theme so we only have one file
lessitizer({
    files: ['app-combined'].map(filePath),
    outputDir: __dirname + '/css'
}, done);

lessitizer({
    files: ['app-err'].map(filePath),
    outputDir: __dirname + '/cssErr',
    developmentMode: true
}, done);
