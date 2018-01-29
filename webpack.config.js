const path = require('path');
var webpack = require("webpack");
module.exports = {
  entry: {
    app: "./src/js/*.js",
    vendor: ["lodash","jquery"],
  },
  output: {
    path: path.resolve(__dirname, 'dist/js'),
    filename: "[name].[chunkhash].js"
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({names: ["vendor"]})
  ]
};
