# fast-refresh-express

Example with:

- [Express](https://expressjs.com/)
- [React](https://reactjs.org/) v18
- [styled-components](https://styled-components.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [SWC](https://swc.rs/)
  - Using [swc-loader](https://www.npmjs.com/package/swc-loader) for [webpack](https://webpack.js.org/)
  - And [@swc/register](https://www.npmjs.com/package/@swc/register) to compile server-side TypeScript at runtime
- [React Fast Refresh](https://www.npmjs.com/package/react-refresh), via [@pmmmwh/react-refresh-webpack-plugin](https://www.npmjs.com/package/@pmmmwh/react-refresh-webpack-plugin)
- Server side rendering

## About React 18 streaming render

Currently, streaming render in React 18 + styled-components has some issues. Current rendering setup right not isn't ideal maybe, but it works!

## How to run locally

Start: `npm run dev`

Runs at: `http://localhost:3000`

## How to run in production

Build: `npm run build`

Start: `npm start`
