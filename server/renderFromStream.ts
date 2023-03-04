import { renderToPipeableStream } from "react-dom/server";
import { Writable } from "node:stream";
import { readFile } from "node:fs/promises";
import path from "node:path";

let webpackStats: Record<string, string> = {};

async function renderToStream(jsx: React.ReactElement): Promise<string> {
  let body = "";

  const writableStream = new Writable({
    write: (chunk, encoding, callback) => {
      body += chunk;
      // Send back to event loop, so renders are non-blocking
      setImmediate(callback);
    },
  });

  webpackStats = JSON.parse(
    await readFile(path.join(__dirname, "../dist/webpack-stats.json"), "utf-8")
  );

  return new Promise((resolve, reject) => {
    const { pipe } = renderToPipeableStream(jsx, {
      bootstrapScripts: [webpackStats["main.js"]],
      onAllReady() {
        pipe(writableStream);
      },
    });

    writableStream.on("finish", () => {
      return resolve(body);
    });

    writableStream.on("error", (error) => {
      return reject(error);
    });
  });
}

export default renderToStream;
