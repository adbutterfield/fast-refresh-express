import React from "react";
import { StaticRouter } from "react-router-dom/server";
import { ServerStyleSheet, StyleSheetManager } from "styled-components";
import { ChunkExtractor, ChunkExtractorManager } from "@loadable/server";
import path from "node:path";
import { readFile } from "node:fs/promises";
import App from "../react/App";
import renderFromStream from "./renderFromStream";

const isProd = process.env.NODE_ENV === "production";
let stats: Record<"string", "string"> | null = null;

async function renderReact(
  req: Req,
  res: Res,
  next: Next
): Promise<Res | void> {
  try {
    stats =
      isProd && stats
        ? stats
        : JSON.parse(
            await readFile(
              path.resolve(process.cwd(), "build/public/loadable-stats.json"),
              "utf-8"
            )
          );

    if (stats === null) {
      throw new Error("loadable-stats file missing");
    }
    const extractor = new ChunkExtractor({ stats });
    // Style sheet object to contain all styles generated from styled components
    const styleSheet = new ServerStyleSheet();
    // Must create a mock window object for components that might need it
    global.window = {} as Window & typeof globalThis;

    // SSR render the full App
    const jsx = (
      <ChunkExtractorManager extractor={extractor}>
        <StyleSheetManager sheet={styleSheet.instance}>
          <StaticRouter location={req.originalUrl}>
            <App />
          </StaticRouter>
        </StyleSheetManager>
      </ChunkExtractorManager>
    );
    const appHtml = await renderFromStream(jsx);

    // You can now collect your script tags
    const scriptTags = extractor.getScriptTags(); // or extractor.getScriptElements();
    // You can also collect your "preload/prefetch" links
    const linkTags = extractor.getLinkTags(); // or extractor.getLinkElements();

    const responseHtml = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Fast Refresh Express</title>
    <link rel="shortcut icon" href="/favicon.ico" />
    ${
      /* styles for styled components rendered by that page */ styleSheet.getStyleTags()
    }
    ${scriptTags}
    ${linkTags}
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
