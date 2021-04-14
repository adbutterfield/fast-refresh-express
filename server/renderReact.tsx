import path from "path";
import { ChunkExtractor } from "@loadable/server";
import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router";
import { ServerStyleSheet } from "styled-components";

const nodeStats = path.resolve(
  __dirname,
  "../build/server/loadable-stats.json"
);
const webStats = path.resolve(__dirname, "../build/public/loadable-stats.json");

function renderReact(req: Req, res: Res, next: Next): Res | void {
  try {
    // Style sheet object to contain all styles generated from styled components
    const styleSheet = new ServerStyleSheet();
    // Chunk extractor to determine which bundle chunks are needed by the render
    const nodeExtractor = new ChunkExtractor({
      statsFile: nodeStats,
    });
    // Get the App component, using server loadable-stats
    const { default: App } = nodeExtractor.requireEntrypoint();

    const webExtractor = new ChunkExtractor({
      statsFile: webStats,
    });
    // Must create a mock window object for components that might need it
    global.window = {} as Window & typeof globalThis;

    // SSR render the full App
    const appHtml = renderToString(
      webExtractor.collectChunks(
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
          ${webExtractor.getStyleTags()}
          ${styleSheet.getStyleTags()}
        </head>
        <body>
          <div id="react-app">${appHtml}</div>
          ${webExtractor.getScriptTags()}
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
