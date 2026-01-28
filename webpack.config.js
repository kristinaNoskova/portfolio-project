const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const RemoveEmptyScriptsPlugin = require('webpack-remove-empty-scripts');
const SVGSpritemapPlugin = require('svg-spritemap-webpack-plugin').default;

const isDev = process.argv.includes('--mode=development');

module.exports = {
  entry: {
    main: './src/js/main.js',
    styles: './src/styles/style.scss'
  },
  output: {
    filename: isDev ? 'js/[name].js' : 'js/[name].[contenthash].js',
    path: path.resolve(__dirname, 'build'),
    publicPath: '/',
    clean: true
  },
  devtool: isDev ? 'inline-source-map' : 'source-map',

  devServer: {
    static: {
      directory: path.resolve(__dirname, 'build')
    },
    open: true,
    hot: true,
    watchFiles: ['src/**/*']
  },

  optimization: isDev ? false : {
    minimize: true,
    minimizer: [
      new TerserPlugin(),
      new CssMinimizerPlugin()
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      minify: !isDev
    }),
    new RemoveEmptyScriptsPlugin(),
    new MiniCssExtractPlugin({
      filename: isDev ? 'css/[name].css' : 'css/[name].[contenthash].css'
    }),
    new SVGSpritemapPlugin(path.resolve(__dirname, 'src/images/icons/**/*.svg'), {
      output: {
        filename: 'sprite.svg',
        chunk: { keep: true },
        svg: { sizes: false },
        sprite: {
          prefix: 'icon-',
          generate: {
            title: false,
            view: '-view'
          }
        }
      }
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'src/images',
          to: 'images',
          globOptions: { ignore: ['**/icons/**'] }
        },
        {
          from: 'src/fonts',
          to: 'fonts',
          noErrorOnMissing: true
        }
      ]
    })
  ],

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.(css|scss|sass)$/i,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader', options: { url: false } },
          'sass-loader'
        ]
      },
      {
        test: /\.html$/i,
        loader: 'html-loader',
        options: { sources: false }
      }
    ]
  }
};
