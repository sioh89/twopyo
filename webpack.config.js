const path = require('path');
const CompressionPlugin = require('compression-webpack-plugin');
const webpack = require('webpack');

const webpackConfig = {
  entry: path.resolve(__dirname, './client/src/index.jsx'),
  output: {
    path: path.resolve(__dirname, './client/dist'),
    filename: 'bundle.js',
  },
  module: {
    loaders: [],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  devtool: 'inline-source-map',
  plugins: [
    new webpack.DefinePlugin({ 
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new CompressionPlugin({
      asset: "[path].gz[query]",
      algorithm: "gzip",
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.8
    }),
  ],
};

webpackConfig.module.loaders.push({
  test: /\.js[x]?$/,
  exclude: /node_modules/,
  loader: 'babel-loader',
  options: { presets: ['es2015', 'react']},
});

webpackConfig.module.loaders.push({
  test: /\.(css)$/,
  loaders: ['style-loader', 'css-loader?url=false']
});

webpackConfig.module.loaders.push({
  test: /\.(png|jpg|gif|jpeg)$/,
  loader: 'file-loader',
  options: {}  
});

webpackConfig.module.loaders.push({
  test: /\.svg$/,
  use: [{
    loader: 'babel-loader'
  }, {
    loader: 'react-svg-loader'
  }]
});

module.exports = webpackConfig;