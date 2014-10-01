module.exports = {
    entry: './main.js',
    output: {
        path: './build',
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            { test: /\.jsx$/, loader: 'jsx-loader?harmony&insertPragma=React.DOM' },
            { test: /\.styl$/, loader: 'style-loader!css-loader!stylus-loader' }
        ]
    }
}
