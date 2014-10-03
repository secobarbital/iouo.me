var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: './main.js',
    output: {
        path: './build',
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            { test: /\.jsx$/, loader: 'jsx?harmony' },
            { test: /\.styl$/, loader: 'style!css!stylus' },
            { test: /\.scss$/, loader: ExtractTextPlugin.extract('style-loader', 'css!sass') },
            { test: /\.woff$/, loader: 'file' },
            { test: /\.eot/, loader: 'file' },
            { test: /\.ttf/, loader: 'file' },
            { test: /\.svg/, loader: 'file' }
        ]
    },
    resolve: {
        modulesDirectories: ['node_modules', 'bower_components'],
        extensions: ['', '.js', '.jsx']
    },
    plugins: [
        new ExtractTextPlugin('[name].css')
    ]
}
