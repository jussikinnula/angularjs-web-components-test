import * as webpack from 'webpack';
import productionConfig from './config/webpack.production';
import developmentConfig from './config/webpack.development';

export default (env, argv): webpack.Configuration => {
  if (argv.mode === 'production') {
    return productionConfig;
  } else {
    return developmentConfig;
  }
};
