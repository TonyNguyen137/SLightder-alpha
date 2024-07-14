const path = require('node:path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env) => {
  return {
    mode: env.mode,

    entry: {
      index: './src/index.js',
    },

    output: {
      filename: '[name].min.js',
      path: path.resolve(__dirname, 'public'),
      clean: true,
    },

    module: {
      rules: [
        {
          test: /\.s[ca]ss$/i,
          use: [
            MiniCssExtractPlugin.loader, // 3. extract css into files
            'css-loader', // 2. Turns css into commonjs
            'sass-loader', // 1. Turns sass into css
          ],
        },
        {
          test: /\.css$/i,
          use: [
            'style-loader', // 3. Inject styles into DOM
            'css-loader', // 2. Turns css into commonjs
            'sass-loader', // 1. Turns sass into css
          ],
        },
        {
          test: /\.html$/i,
          use: 'html-loader',
        },
      ],
    },

    plugins: [
      new MiniCssExtractPlugin({
        filename: '[name]min.css',
      }),
      new HtmlWebpackPlugin({
        template: './playground/index.html',
        filename: '[name].html',
      }),
    ],
  };
};
