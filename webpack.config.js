const { resolve } = require('path');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// Generate an id that updates every 66 seconds.
const id = parseInt(Date.now() / 65536).toString(36);
const path = resolve(__dirname, 'site/static/assets/app');

const appJs = `app-${id}.min.js`;
const appCss = `app-${id}.min.css`;

module.exports = {
  entry: './src/index.js',
  output: {
    path,
    filename: appJs,
    library: 'Site',
    libraryTarget: 'window',
    libraryExport: 'default',
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: appCss,
    }),
  ],
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: ['postcss-preset-env'],
              },
            },
          },
          'sass-loader',
        ],
      },
    ],
  },
};
