import { Express } from "express";
import webpack from "webpack";
import webpackDevMiddleware from "webpack-dev-middleware";
import webpackHotMiddleware from "webpack-hot-middleware";
import config from "../webpack.multi.config";

const isDev = process.env.NODE_ENV === "development";

const compiler = webpack(config);

const addDevMiddleware = (app: Express): void => {
  if (isDev) {
    app.use(
      // @ts-ignore
      webpackDevMiddleware(compiler, {
        serverSideRender: true,
        publicPath: "/",
        writeToDisk(filePath) {
          return (
            /build\/server\//.test(filePath) || /loadable-stats/.test(filePath)
          );
        },
      })
    );

    app.use(
      // @ts-ignore
      webpackHotMiddleware(compiler, {
        log: false,
        path: "/__webpack_hmr",
        heartbeat: 10 * 1000,
      })
    );
  }
};

export default addDevMiddleware;
