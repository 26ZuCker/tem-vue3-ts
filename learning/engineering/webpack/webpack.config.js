const path = require('path');
const fs = require('fs');
const qs = require('qs');

module.exports = {
  entry: './src/index.js',
  mode: 'development',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test,
        use: [
          { loader, options },
          { loader, options },
        ],
      },
      {
        test,
        use: [
          { loader, options },
          { loader, options },
        ],
      },
    ],
  },
};
