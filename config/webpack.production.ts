import * as path from 'path';
import * as webpack from 'webpack';
import * as merge from 'webpack-merge';

const NormalModuleReplacementPlugin = webpack.NormalModuleReplacementPlugin;
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

import { commonConfig, sourcePath } from './webpack.common';

export default merge(commonConfig, {
  devtool: 'source-map',

  plugins: [
    new NormalModuleReplacementPlugin(
      /\/environments\/environment\.ts/,  path.resolve(sourcePath, 'environments/environment.prod.ts')
    ),
    new UglifyJsPlugin({ sourceMap: true })
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
              sourcemap: true,
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
