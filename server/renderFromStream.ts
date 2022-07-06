import { renderToPipeableStream } from "react-dom/server";
import { Writable } from "stream";
import webpackStats from '../dist/webpack-stats.json';

function renderToStream(
  jsx: React.ReactElement
): Promise<string> {
  let body = '';

  const writableStream = new Writable({
    write: (chunk, encoding, callback) => {
      body += chunk;
      // Send back to event loop, so renders are non-blocking
      setImmediate(callback);
    },
  });

  return new Promise((resolve, reject) => {
    const { pipe } = renderToPipeableStream(jsx, {
      bootstrapScripts: [webpackStats['main.js']],
      onAllReady() {
        pipe(writableStream);
      },
    });

    writableStream.on('finish', () => {
      return resolve(body);
    });

    writableStream.on('error', (error) => {
      return reject(error);
    })
  });
}

export default renderToStream;
