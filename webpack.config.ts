import path from "node:path";
import webpack from "webpack";
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";
import { WebpackManifestPlugin } from "webpack-manifest-plugin";
import LoadablePlugin from "@loadable/webpack-plugin";
// import swcConfig from "./swc.config.json";

const isDevMode = process.env.NODE_ENV === "development";

const sharedPlugins = [
  new WebpackManifestPlugin({
    fileName: "webpack-stats.json",
    writeToFileEmit: true,
  }),
  new LoadablePlugin(),
];
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

const main = isDevMode
  ? ["webpack-hot-middleware/client", "./react/index.tsx"]
  : ["./react/index.tsx"];

const contenthash = isDevMode ? "" : ".[contenthash:8]";

const webpackConfig: webpack.Configuration = {
  mode: isDevMode ? "development" : "production",
  entry: {
    main,
  },
  output: {
    clean: true,
    path: path.resolve(__dirname, "./dist"),
    filename: `[name]${contenthash}.js`,
    chunkFilename: `[name].chunk${contenthash}.js`,
    publicPath: "/",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"],
  },
  module: {
    rules: [
      {
        test: /\.(js|ts|tsx)$/,
        exclude: /node_modules/,
        include: [path.join(__dirname, "react")], // only bundle files in this directory
        use: {
          loader: "swc-loader",
          options: {
            ...swcConfig,
            jsc: {
              ...swcConfig.jsc,
              transform: {
                react: {
                  runtime: "automatic",
                  refresh: isDevMode,
                },
              },
            },
            module: {
              type: "nodenext",
            },
          },
        },
      },
    ],
  },
  plugins,
};

if (isDevMode) {
  webpackConfig.cache = {
    // https://webpack.js.org/configuration/other-options/#cache
    type: "filesystem",
    cacheDirectory: path.resolve(__dirname, ".tmp"),
    name: "dev-react-cache",
  };
}

export default webpackConfig;
