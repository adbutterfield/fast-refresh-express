module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          node: "current",
        },
        useBuiltIns: "usage",
        corejs: 3,
      },
    ],
    "@babel/preset-react",
    "@babel/preset-typescript",
  ],
  plugins: [
    "@babel/plugin-transform-runtime",
    [
      "babel-plugin-styled-components",
      { ssr: true, displayName: true, preprocess: false },
    ],
    [
      "module-resolver",
      {
        root: ["."],
        alias: {
          "@pages": "./react/pages",
          "@components": "./react/components",
        },
      },
    ],
  ],
};
