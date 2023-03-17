import React from "react";
import { StaticRouter } from "react-router-dom/server";
import { ServerStyleSheet, StyleSheetManager } from "styled-components";
import renderFromStream from "./renderFromStream";

async function renderReact(
  req: Req,
  res: Res,
  next: Next
): Promise<Res | void> {
  try {
    const { default: App } = await import("../../react/App");
    // Style sheet object to contain all styles generated from styled components
    const styleSheet = new ServerStyleSheet();
    // Must create a mock window object for components that might need it
    global.window = {} as Window & typeof globalThis;

    // SSR render the full App
    const jsx = (
      <StyleSheetManager sheet={styleSheet.instance}>
        <StaticRouter location={req.originalUrl}>
          <App />
        </StaticRouter>
      </StyleSheetManager>
    );

    const appHtml = await renderFromStream(jsx);
    const responseHtml = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Fast Refresh Express</title>
    <link rel="shortcut icon" href="/favicon.ico" />
    ${
      /* styles for styled components rendered by that page */ styleSheet.getStyleTags()
    }
  </head>
  <body>
    <div id="react-app">${appHtml}</div>
  </body>
</html>`;

    styleSheet.seal();
    return res.send(responseHtml);
  } catch (err) {
    return next(err);
  }
}

export default renderReact;
