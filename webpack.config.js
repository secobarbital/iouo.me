module.exports = {
  target: 'web',
  entry: __dirname + '/src/index.jsx',
  output: {
    path: __dirname + '/public/',
    filename: 'bundle.js',
    publicPath: '/'
  },
  module: {
    loaders: [
      { test: /\.jsx?$/, loader: '6to5-loader', exclude: /node_modules/ }
    ],
    noParse: /\.min\.js/
  },
  resolve: {
    extensions: ['', '.js', '.json', '.jsx'],
    modulesDirectories: ['node_modules']
  }
};
