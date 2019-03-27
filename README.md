# angularjs-web-components-test

Please see https://github.com/vsternbach/angularjs-typescript-webpack for more details on the configuration.

## Usage

- `npm run clean` = delete `dist` -directory
- `npm run assets` = copy `src/assets` to `dist/assets`
- `npm run assets:watch` = copy `src/assets` to `dist/assets` in watch mode
- `npm start` = `npm run assets` first, then start `npm run assets:watch` and `npm run server:dev` concurrently
- `npm run build` = clean, copy assets & production build
- `npm run build:prod` = do a production build
- `npm run build:dev` = do a development build
- `npm run server:dev` = start webpack-dev-server
- `npm run test` = run karma tests (single run)
- `npm run test:dev` = run CI tests

