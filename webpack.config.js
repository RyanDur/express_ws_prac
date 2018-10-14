const nodeExternals = require('webpack-node-externals');
const path = require('path');

module.exports = {
  mode: "production",
  resolve: {
    extensions: ['.ts', '.js']
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  target: 'node',
  externals: [nodeExternals()]
};