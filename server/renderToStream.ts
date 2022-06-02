import { renderToPipeableStream } from "react-dom/server";
import { Duplex } from "stream";
import { ServerStyleSheet } from "styled-components";

class RenderStream extends Duplex {
  _read() {}
  _write(
    chunk: any,
    encoding: BufferEncoding,
    next: (error?: Error | null) => void
  ): void {
    this.push(chunk);
    next();
  }
}

function renderToStream(
  jsx: React.ReactElement,
  styleSheet: ServerStyleSheet
): Promise<NodeJS.ReadableStream> {
  return new Promise((resolve, reject) => {
    const stream = new RenderStream();

    const { pipe } = renderToPipeableStream(jsx, {
      bootstrapScripts: ["/main.js"],
      onAllReady() {
        pipe(stream);
      },
    });

    stream.on("finish", () => {
      stream.push(null);
      return resolve(styleSheet.interleaveWithNodeStream(stream));
    });

    stream.on("error", (error) => {
      return reject(error);
    });
  });
}

export default renderToStream;
