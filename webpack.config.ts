import path from "path";
import LoadablePlugin from "@loadable/webpack-plugin";
import webpack from "webpack";
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";
import nodeExternals from "webpack-node-externals";

const isDevMode = process.env.NODE_ENV === "development";

const getBuildPath = (target: "web" | "node") =>
  path.resolve(__dirname, `./build/${target === "web" ? "public" : "server"}/`);

const sharedPlugins = [
  new LoadablePlugin(),
  new webpack.DefinePlugin({
    window: "window",
  }),
];

// Add the plugins for HMR in dev mode
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

// Add the webpack-hot-middleware/client entry for HMR in dev mode.
// Also need ?name=${target} because of the multi compiler.
const getMain = (target: "web" | "node") =>
  isDevMode && target === "web"
    ? [
        `webpack-hot-middleware/client?name=${target}`,
        `./src/react/main-${target}.js`,
      ]
    : [`./src/react/main-${target}.js`];

// Don't add the chunkhash in dev (so compile time is faster),
// or for the SSR files
const chunkhash = (target: "web" | "node") =>
  !isDevMode && target === "web" ? "?v=[chunkhash:8]" : "";

const getConfig = (target: "web" | "node"): webpack.Configuration => ({
  mode: isDevMode ? "development" : "production",
  name: target,
  target,
  entry: {
    main: getMain(target),
  },
  output: {
    path: getBuildPath(target),
    filename: `[name].js${chunkhash(target)}`,
    chunkFilename: `[name].chunk.js${chunkhash(target)}`,
    publicPath: `/`,
    // For node, compile to commonjs2.
    // https://webpack.js.org/configuration/output/#type-commonjs2
    ...(target === "node" && {
      library: {
        type: "commonjs2",
      },
    }),
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"],
    // Adding the alias fixes "You should not use <Link> outside a <Router>" issue for SSR
    // See: https://github.com/ReactTraining/react-router/issues/6789#issuecomment-502490351
    alias: {
      "react-router-dom": path.join(
        __dirname,
        "node_modules/react-router-dom/"
      ),
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader", // cf. babelrc.config.js in this folder and browser list in package.json
          options: {
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
    // Using runtimeChunk doesn't currently work,
    // because of this open issue: https://github.com/gregberge/loadable-components/issues/527
    // runtimeChunk: true, // see https://webpack.js.org/guides/build-performance/#minimal-entry-chunk
  },
  ...(target === "node" && {
    externals: [
      "@loadable/component",
      nodeExternals(),
      "react",
      "react-dom",
      "react-router-dom",
      "react-router",
    ],
  }),
  // Add cache in dev mode, for faster re-compiles.
  // https://webpack.js.org/configuration/other-options/#cache
  ...(isDevMode && {
    cache: {
      type: "filesystem",
      cacheDirectory: path.resolve(__dirname, ".tmp"),
      name: `dev-${target}-cache`,
    },
  }),
});

export default [getConfig("web"), getConfig("node")];
