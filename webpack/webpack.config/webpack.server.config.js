const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.config');

module.exports = merge(baseWebpackConfig, {
  mode: "development",
  devServer: {
    port: 8080,
    contentBase: baseWebpackConfig.externals.paths.dist,
    watchContentBase: true,
    overlay: {
      warnings: true,
      errors: true
    },
    inline: true,
    hot: true
  },
  devtool: "eval-cheap-source-map"
});