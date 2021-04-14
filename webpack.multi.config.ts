import path from "path";
import LoadablePlugin from "@loadable/webpack-plugin";
import webpack from "webpack";
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";
import nodeExternals from "webpack-node-externals";

const isDevMode = process.env.NODE_ENV === "development";

const jsPlugins = isDevMode ? ["react-refresh/babel"] : [];

const getBuildPath = (target: "web" | "node") =>
  path.resolve(__dirname, `./build/${target === "web" ? "public" : "server"}`);

const sharedPlugins = [new LoadablePlugin()];
const plugins = isDevMode
  ? [
      ...sharedPlugins,
      new webpack.HotModuleReplacementPlugin(),
      new ReactRefreshWebpackPlugin({
        overlay: {
          sockIntegration: "whm",
        },
      }),
    ]
  : sharedPlugins;

const getMain = (target: "web" | "node") =>
  isDevMode && target === "web"
    ? ["webpack-hot-middleware/client", `./react/main-${target}.js`]
    : [`./react/main-${target}.js`];

const chunkhash = isDevMode ? "" : "?v=[chunkhash:8]";

const getConfig = (target: "web" | "node"): webpack.Configuration => ({
  mode: isDevMode ? "development" : "production",
  name: target,
  target,
  entry: {
    main: getMain(target),
  },
  output: {
    path: getBuildPath(target),
    filename: `[name].js${chunkhash}`,
    chunkFilename: `[name].chunk.js${chunkhash}`,
    publicPath: `/build/${target === "web" ? "public" : "server"}`,
    library: {
      type: "commonjs2",
    },
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"],
  },
  module: {
    rules: [
      {
        test: /\.(js|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader", // cf. babelrc.config.js in this folder and browser list in package.json
          options: {
            plugins: jsPlugins,
            caller: { target },
          },
        },
      },
    ],
  },
  plugins,
  optimization: {
    moduleIds: "named",
    chunkIds: "named",
    // runtimeChunk: true, // see https://webpack.js.org/guides/build-performance/#minimal-entry-chunk
  },
  externals:
    target === "node" ? ["@loadable/component", nodeExternals()] : undefined,
  ...(isDevMode && {
    cache: {
      // https://webpack.js.org/configuration/other-options/#cache
      type: "filesystem",
      cacheDirectory: path.resolve(__dirname, ".tmp"),
      name: `dev-${target}-cache`,
    },
  }),
});

export default [getConfig("web"), getConfig("node")];
