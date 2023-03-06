import path from "node:path";
import webpack from "webpack";
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";
import { WebpackManifestPlugin } from "webpack-manifest-plugin";
import swcConfig from "./swc.config.json";

const isDevMode = process.env.NODE_ENV === "development";

const webpackSwcConfig = {
  ...swcConfig,
  jsc: {
    ...swcConfig.jsc,
    transform: {
      react: {
        runtime: "automatic",
        // Enable fast refresh in dev
        refresh: isDevMode,
      },
    },
  },
  module: {
    // Set module type to get code splitting.
    // Code splitting does not work for type: "commonjs".
    type: "nodenext",
  },
};

const contenthash = isDevMode ? "" : ".[contenthash:8]";

const webpackConfig: webpack.Configuration = {
  mode: isDevMode ? "development" : "production",
  entry: {
    main: ["./react/index.tsx"],
  },
  output: {
    clean: true,
    path: path.resolve(__dirname, "./build"),
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
          options: webpackSwcConfig,
        },
      },
    ],
  },
  plugins: [
    new WebpackManifestPlugin({
      fileName: "webpack-stats.json",
      writeToFileEmit: true,
    }),
  ],
  optimization: {
    moduleIds: "deterministic", // Now, despite any new local dependencies, our vendor hash should stay consistent between builds
    runtimeChunk: true, // see https://webpack.js.org/guides/build-performance/#minimal-entry-chunk
  },
};

if (isDevMode) {
  webpackConfig.entry = {
    main: ["@gatsbyjs/webpack-hot-middleware/client", "./react/index.tsx"],
  };

  webpackConfig.plugins = [
    ...(webpackConfig.plugins || []),
    new webpack.HotModuleReplacementPlugin(),
    new ReactRefreshWebpackPlugin({
      overlay: {
        sockIntegration: "whm",
      },
    }),
  ];

  webpackConfig.cache = {
    // https://webpack.js.org/configuration/other-options/#cache
    type: "filesystem",
    cacheDirectory: path.resolve(__dirname, ".tmp"),
    name: "dev-react-cache",
  };
}

export default webpackConfig;
