import * as webpack from 'webpack';
import * as path from 'path';

const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

export const sourcePath = path.resolve(__dirname, '../src');
export const distPath = path.resolve(__dirname, '../dist');

export const commonConfig: webpack.Configuration = {
  devtool: 'cheap-eval-source-map',

  entry: {
    app: path.resolve(sourcePath, 'main.ts'),
    testWebComponent: path.resolve(sourcePath, 'test-web-component.ts')
  },

  output: {
    path: distPath,
    filename: '[name].bundle.[hash:4].js',
  },

  module: {
    rules: [
      {
        test: /\.html$/,
        loader: 'html-loader',
        options: { minimize: true }
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'resolve-url-loader']
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'resolve-url-loader', 'sass-loader']
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        loader: 'file-loader',
        options: {
          name: 'images/[name].[ext]'
        }
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        loader: 'file-loader',
        options: {
          name: 'fonts/[name].[ext]'
        }
      }
    ],
  },

  resolve: {
    extensions: ['.js', '.ts'],
    modules: [
      path.resolve(__dirname, '../node_modules'),
      sourcePath
    ]
  },

  plugins: [
    new HtmlWebPackPlugin({
      template: path.resolve(sourcePath, 'index.html')
    }),

    new MiniCssExtractPlugin({
      filename: '[name].[contenthash:4].css',
      chunkFilename: '[id].[contenthash:4].css'
    }),

    new ForkTsCheckerWebpackPlugin({
      tslint: true,
      checkSyntacticErrors: true
    }),

    new CopyPlugin([
      {
        from: path.resolve(sourcePath, 'assets'),
        to: distPath
      },
    ]),

    new CleanWebpackPlugin(),
  ],

  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all'
        }
      }
    }
  }
};
