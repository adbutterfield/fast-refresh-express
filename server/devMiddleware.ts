import { Express } from "express";
import webpack from "webpack";
import webpackDevMiddleware from "webpack-dev-middleware";
import webpackHotMiddleware from "@gatsbyjs/webpack-hot-middleware";
import path from "node:path";
import config from "../webpack.config";

const isDev = process.env.NODE_ENV === "development";

const compiler = webpack(config);

const dirName = path.resolve(__dirname, "../react/");

if (isDev) {
  compiler.hooks.afterEmit.tap("cleanup-the-require-cache", () => {
    // After webpack rebuild, clear the files from the require cache,
    // so that next server side render will be in sync
    Object.keys(require.cache)
      .filter((key) => key.includes(dirName))
      .forEach((key) => delete require.cache[key]);
  });
}

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
