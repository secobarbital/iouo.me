var less = require('less');
var path = require('path');
var async = require('async');
var defaults = require('defaults');
var fs = require('fs');
var cssesc = require('cssesc');

function passError(err, cb) {
    if (cb) {
        cb(err);
    } else {
        throw err;
    }
}

function cssErr(err) {
    var errMessage = cssesc("Lessitizer error: \n\n" + err, { escapeEverything: true });
    var css = fs.readFileSync(path.join(__dirname, 'error.css')).toString();
    css += 'body:before { content: "' + errMessage + '"; }';
    return css;
}

module.exports = function (options, done) {
    var optionsErr;

    // Defaults, yo
    defaults(options, {
        files: [],
        less: {},
        toCSS: {},
        developmentMode: false,
        outputDir: null
    });

    // Some real bad errors right here
    if (!options.outputDir) {
        optionsErr = new Error('You must specify an `outputDir`.');
    }
    else if (!options.files || options.files.length === 0) {
        optionsErr = new Error('You must specify some `files`.');
    }

    if (optionsErr) {
        return passError(optionsErr, done);
    }

    // Some options we dont allow
    delete options.less.outputDir;
    delete options.less.filename;

    var lessFiles = Array.isArray(options.files) ? options.files : [options.files];
    var outputDir = options.outputDir;

    async.each(lessFiles, function _lessFile(lessFile, fileDone) {
        var lessFileName = path.basename(lessFile, '.less');
        var lessDir = path.dirname(lessFile);
        var lessPath = path.resolve(lessDir, lessFileName + '.less');
        var cssPath = path.resolve(outputDir, lessFileName + '.css');
        var lessString = fs.readFileSync(lessPath, 'utf8');

        defaults(options.less, {
            optimization: 1,
            relativeUrls: true,
            paths: [lessDir],
            filename: lessFileName + '.less',
            outputDir: outputDir
        });

        new less.Parser(options.less)
        .parse(lessString, function _parseLess(lessErr, cssTree) {
            var css;
            lessErr && (lessErr = less.formatError(lessErr));
            if (lessErr && !options.developmentMode) {
                return fileDone(lessErr);
            } else if (lessErr) {
                css = cssErr(lessErr);
            } else {
                css = cssTree.toCSS(options.toCSS);
            }
            fs.writeFile(cssPath, css, {encoding: 'utf8'}, function _writeFile(fileErr) {
                if (fileErr || lessErr) {
                    fileDone(fileErr || lessErr);
                } else {
                    fileDone(null);
                }
            });
        });
    }, function (err) {
        done(err || null, lessFiles);
    });
};