import { Express } from "express";
import webpack from "webpack";
import webpackDevMiddleware from "webpack-dev-middleware";
import webpackHotMiddleware from "webpack-hot-middleware";

const isDev = process.env.NODE_ENV === "development";

const addDevMiddleware = (app: Express): void => {
  if (isDev) {
    const { default: config } = require("../../webpack.config");
    const compiler = webpack(config);
    app.use(
      // @ts-ignore
      webpackDevMiddleware(compiler, {
        serverSideRender: true,
        publicPath: "/",
        // Write the loadable-stats and SSR chunks to disk
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
