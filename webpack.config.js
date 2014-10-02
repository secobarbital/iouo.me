module.exports = {
    entry: './main.js',
    output: {
        path: './build',
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            { test: /\.jsx$/, loader: 'jsx?harmony&insertPragma=React.DOM' },
            { test: /\.styl$/, loader: 'style!css!stylus' },
            { test: /\.scss$/, loader: 'style!css!sass' },
            { test: /\.woff$/, loader: 'file' },
            { test: /\.eot/, loader: 'file' },
            { test: /\.ttf/, loader: 'file' },
            { test: /\.svg/, loader: 'file' }
        ]
    },
    resolve: {
        modulesDirectories: ['node_modules', 'bower_components'],
        extensions: ['', '.js', '.jsx']
    }
}
