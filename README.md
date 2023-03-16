# fast-refresh-express

Example with:

- [Express](https://expressjs.com/)
- [React](https://reactjs.org/) v18
- [styled-components](https://styled-components.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [SWC](https://swc.rs/)
  - Using [swc-loader](https://www.npmjs.com/package/swc-loader) for [webpack](https://webpack.js.org/)
  - with the help of [@swc/plugin-styled-components](https://www.npmjs.com/package/@swc/plugin-styled-components)
  - and [@swc/cli](https://www.npmjs.com/package/@swc/cli) to build server for production
  - and [@swc/register](https://www.npmjs.com/package/@swc/register) to compile server-side TypeScript at runtime for dev
  - with tests using [@swc/jest](https://www.npmjs.com/package/@swc/jest)
- [React Fast Refresh](https://www.npmjs.com/package/react-refresh)
  - Using [@pmmmwh/react-refresh-webpack-plugin](https://www.npmjs.com/package/@pmmmwh/react-refresh-webpack-plugin)
  - and webpack-hot-middleware (thanks to [@gatsbyjs/webpack-hot-middleware](https://www.npmjs.com/package/@gatsbyjs/webpack-hot-middleware))
- Server side rendering

## About React 18 streaming render

Currently, streaming render in React 18 + styled-components has some issues. Current rendering setup right not isn't ideal maybe, but it works!

## Like to use loadable-components?

Checkout the [loadable-components branch](https://github.com/adbutterfield/fast-refresh-express/tree/loadable-components)!

## Like to use babel?

Checkout the [babel branch](https://github.com/adbutterfield/fast-refresh-express/tree/babel)!

## How to run locally

Start: `npm run dev`

Runs at: `http://localhost:3000`

## How to run in production

Build: `npm run build`

Start: `npm start`

## How to test

`npm test`
