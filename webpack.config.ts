import path from 'path';
import LoadablePlugin from '@loadable/webpack-plugin';
import webpack from 'webpack';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';

const isDevMode = process.env.NODE_ENV === 'development';

const jsPlugins = isDevMode ? ['react-refresh/babel'] : [];

const sharedPlugins = [new LoadablePlugin()];
const plugins = isDevMode
  ? [
      ...sharedPlugins,
      new webpack.HotModuleReplacementPlugin(),
      new ReactRefreshWebpackPlugin({
        overlay: {
          sockIntegration: 'whm',
        },
      }),
    ]
  : sharedPlugins;

const main = isDevMode ? ['webpack-hot-middleware/client', './react/index.tsx'] : ['./react/index.tsx'];

const chunkhash = isDevMode ? '' : '?v=[chunkhash:8]';

const webpackConfig: webpack.Configuration = {
  mode: isDevMode ? 'development' : 'production',
  entry: {
    main,
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: `[name].js${chunkhash}`,
    chunkFilename: `[name].chunk.js${chunkhash}`,
    publicPath: '/',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.(js|ts|tsx)$/,
        exclude: /node_modules/,
        include: [path.join(__dirname, 'react')], // only bundle files in this directory
        use: {
          loader: 'babel-loader', // cf. .babelrc.json in this folder and browser list in package.json
          options: {
            plugins: jsPlugins,
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
    type: 'filesystem',
    cacheDirectory: path.resolve(__dirname, '.tmp'),
    name: 'dev-react-cache',
  };
}

export default webpackConfig;
