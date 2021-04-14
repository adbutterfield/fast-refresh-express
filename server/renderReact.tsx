import path from "path";
import { ChunkExtractor } from "@loadable/server";
import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router";
import { ServerStyleSheet } from "styled-components";
import App from "../react/App";

const statsFile = path.resolve(__dirname, "../dist/loadable-stats.json");

function renderReact(req: Req, res: Res, next: Next): Res | void {
  try {
    // Style sheet object to contain all styles generated from styled components
    const styleSheet = new ServerStyleSheet();
    // Chunk extractor to determine which bundle chunks are needed by the render
    const extractor = new ChunkExtractor({
      statsFile,
      outputPath: path.resolve(__dirname, "../dist/"),
    });
    // Must create a mock window object for components that might need it
    global.window = {} as Window & typeof globalThis;

    // SSR render the full App
    const appHtml = renderToString(
      extractor.collectChunks(
        styleSheet.collectStyles(
          React.createElement(
            StaticRouter,
            { location: req.originalUrl, context: {} },
            React.createElement(App)
          )
        )
      )
    );
    const responseHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          ${extractor.getStyleTags()}
          ${styleSheet.getStyleTags()}
        </head>
        <body>
          <div id="react-app">${appHtml}</div>
          ${extractor.getScriptTags()}
        </body>
      </html>
    `;

    styleSheet.seal();

    // inject
    return res.send(responseHtml);
  } catch (err) {
    return next(err);
  }
}

export default renderReact;
