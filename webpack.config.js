/* eslint-disable no-process-env */
const webpack = {
  devServer: {
    host: process.env.HOST || '127.0.0.1',
    port: process.env.PORT || '8000',
    watchContentBase: true,
  },
  module: {
    rules: [{
      exclude: /node_modules/u,
      use: {
        loader: 'babel-loader',
      },
    }],
  },
};
/* eslint-enable no-process-env */

/* eslint-disable no-undef, import/no-commonjs */
module.exports = webpack;
/* eslint-enable no-undef, import/no-commonjs */
