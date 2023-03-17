import { Express } from "express";
import webpackDevMiddleware from "webpack-dev-middleware";
import webpackHotMiddleware from "@gatsbyjs/webpack-hot-middleware";
import config, { compiler } from "../webpack.config";

const isDev = process.env.NODE_ENV === "development";

const addDevMiddleware = (app: Express): void => {
  if (isDev) {
    app.use(
      webpackDevMiddleware(compiler, {
        serverSideRender: true,
        publicPath: config.output?.publicPath || "/",
      })
    );

    app.use(
      webpackHotMiddleware(compiler, {
        log: false,
        path: "/__webpack_hmr",
        heartbeat: 10 * 1000,
      })
    );
  }
};

export default addDevMiddleware;
