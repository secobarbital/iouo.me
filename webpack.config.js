module.exports = {
    entry: './app/client.js',
    output: {
        path: './public',
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            { test: /\.styl$/, loader: 'style!css!stylus' }
        ]
    },
    resolve: {
        modulesDirectories: ['node_modules', 'bower_components'],
    }
}
