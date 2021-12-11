const webpack = require("webpack");
const { merge } = require("webpack-merge");
const webpackBaseConfig = require("./webpack.base.config");
const developmentConfig = () => {
  return merge([
    {
      mode: "development",
      plugins: [
        new webpack.DefinePlugin({
          isDevelopment: true,
        }),
      ],
    },
  ]);
};
module.exports = () => merge(webpackBaseConfig(), developmentConfig());
