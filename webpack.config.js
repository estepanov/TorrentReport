require('dotenv').config();
const webpack = require('webpack');
const LiveReloadPlugin = require('webpack-livereload-plugin');

console.log()
const isDev = process.env.NODE_ENV === 'development';
const isProd = process.env.NODE_ENV === 'production';
const pluginsArr = [
  new webpack.DefinePlugin({
    PRODUCTION: JSON.stringify(isProd),
    BUILD_DATE: JSON.stringify(new Date()),
    GOOGLE_ANALYTICS_ID: JSON.stringify(process.env.GOOGLE_ANALYTICS_ID),
  }),
];

if (isDev) {
  pluginsArr.push(new LiveReloadPlugin({ appendScriptTag: true }));
}

module.exports = {
  entry: './client/index.js',
  output: {
    path: __dirname,
    filename: './public/js/bundle.js',
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
      },
    ],
  },
  plugins: pluginsArr,
};
