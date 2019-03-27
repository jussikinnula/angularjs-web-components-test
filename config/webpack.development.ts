import * as path from 'path';
import * as webpack from 'webpack';
import * as merge from 'webpack-merge';

const HotModuleReplacementPlugin = webpack.HotModuleReplacementPlugin;
const NormalModuleReplacementPlugin = webpack.NormalModuleReplacementPlugin;
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

import { commonConfig, sourcePath } from './webpack.common';

export default merge(commonConfig, {
  plugins: [
    new HotModuleReplacementPlugin()
  ],

  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ng-annotate-loader',
            options: {
              ngAnnotate: 'ng-annotate-patched',
              sourcemap: false,
            },
          },
          {
            loader: 'ts-loader',
            options: {
              configFile: path.resolve(sourcePath, 'tsconfig.app.json'),
              // disable type checker - we will use it in fork plugin
              transpileOnly: true,
            }
          }
        ]
      },
    ]
  }
});
