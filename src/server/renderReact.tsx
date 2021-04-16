import path from "path";
import { ChunkExtractor } from "@loadable/server";
import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router";
import { ServerStyleSheet } from "styled-components";

const nodeStats = path.resolve(
  __dirname,
  "../../build/server/loadable-stats.json"
);
console.log("nodeStats", nodeStats);
const webStats = path.resolve(
  __dirname,
  "../../build/public/loadable-stats.json"
);
console.log("webStats", webStats);

function renderReact(req: Req, res: Res, next: Next): Res | void {
  try {
    // Style sheet object to contain all styles generated from styled components
    const styleSheet = new ServerStyleSheet();

    // Chunk extractor to get the SSR entry
    const nodeExtractor = new ChunkExtractor({
      statsFile: nodeStats,
      outputPath: path.resolve(__dirname, `../../build/server`),
    });

    // Get the App component, using server loadable-stats
    const { default: App } = nodeExtractor.requireEntrypoint();

    // Chunk extractor to get bundle chunks needed for the render
    const webExtractor = new ChunkExtractor({
      statsFile: webStats,
      outputPath: path.resolve(__dirname, `../../build/public`),
    });

    // SSR render the App
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
          ${/* styled components */ styleSheet.getStyleTags()}
        </head>
        <body>
          <div id="react-app">${appHtml}</div>
          ${/* client js chunks */ webExtractor.getScriptTags()}
        </body>
      </html>
    `;

    // Seal the stylesheets
    styleSheet.seal();

    return res.send(responseHtml);
  } catch (err) {
    return next(err);
  }
}

export default renderReact;
