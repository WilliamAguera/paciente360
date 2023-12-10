const common = require("./webpack.common");
const webpack = require("webpack");
const { merge } = require('webpack-merge');

const node_env = { 'process.env.NODE_ENV': JSON.stringify('development') };

module.exports = merge(common, {
  entry: {
    main: ['webpack-hot-middleware/client?reload=true']
  },
  mode: 'development',
  devtool: '#source-map',
  plugins: [new webpack.HotModuleReplacementPlugin(), new webpack.DefinePlugin(node_env)]
});