import { Express } from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import chokidar from 'chokidar';
import path from 'path';
import config from '../webpack.config';

const isDev = process.env.NODE_ENV === 'development';

const compiler = webpack(config);

if (isDev) {
  // Create a watcher on the react directory
  const watcher = chokidar.watch(path.resolve(__dirname, '../react/'));
  watcher.on('ready', () => {
    watcher.on('all', (event, changedFilepath) => {
      // On all changes to the react directory, clear the files from the require cache,
      // so that next server side render wil be in sync
      delete require.cache[changedFilepath];
    });
  });
}

const addDevMiddleware = (app: Express): void => {
  if (isDev) {
    app.use(
      // @ts-ignore
      webpackDevMiddleware(compiler, {
        serverSideRender: true,
        // @ts-ignore
        publicPath: config.output.publicPath || '/',
      }),
    );

    app.use(
      // @ts-ignore
      webpackHotMiddleware(compiler, {
        log: false,
        path: '/__webpack_hmr',
        heartbeat: 10 * 1000,
      }),
    );
  }
};

export default addDevMiddleware;
