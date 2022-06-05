import React from "react";
import { StaticRouter } from "react-router-dom/server";
import App from "../react/App";
import renderToStream from "./renderToStream";

async function renderReact(
  req: Req,
  res: Res,
  next: Next
): Promise<Res | void> {
  try {
    // Must create a mock window object for components that might need it
    global.window = {} as Window & typeof globalThis;

    // SSR render the full App
    const jsx =
      React.createElement(
        StaticRouter,
        { location: req.originalUrl },
        React.createElement(App)
      );

    const stream = await renderToStream(jsx);
    res.write(`<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
  </head>
  <body>
    <div id="react-app">`);
    // Stream the react generated markup
    stream.pipe(res, { end: false });
    stream.on("end", () => {
      res.end(`</div>
  </body>
</html>`);
    });
  } catch (err) {
    return next(err);
  }
}

export default renderReact;
