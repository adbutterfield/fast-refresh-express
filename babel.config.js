function isWebTarget(caller) {
  return Boolean(caller && caller.target === "web");
}

function isWebpack(caller) {
  return Boolean(caller && caller.name === "babel-loader");
}

module.exports = (api) => {
  const web = api.caller(isWebTarget);
  const webpack = api.caller(isWebpack);

  const isDevMode = process.env.NODE_ENV === "development";

  const plugins = isDevMode
    ? [
        "@babel/plugin-syntax-dynamic-import",
        "react-refresh/babel",
        "@loadable/babel-plugin",
        [
          "babel-plugin-styled-components",
          { ssr: true, displayName: true, preprocess: false },
        ],
      ]
    : [
        "@babel/plugin-syntax-dynamic-import",
        "@loadable/babel-plugin",
        [
          "babel-plugin-styled-components",
          { ssr: true, displayName: true, preprocess: false },
        ],
      ];

  return {
    presets: [
      "@babel/preset-react",
      [
        "@babel/preset-env",
        {
          useBuiltIns: web ? "entry" : undefined,
          corejs: web ? "core-js@3" : false,
          targets: !web ? { node: "current" } : undefined,
          modules: webpack ? false : "commonjs",
        },
      ],
      "@babel/preset-typescript",
    ],
    plugins,
  };
};
