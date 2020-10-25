const path = require('path');

module.exports = {
  entry: './index.ts',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  devtool: 'source-map',
  target: 'node',
  resolve: {
    extensions: ['.ts', '.js' ]
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, '../../')
  }
};