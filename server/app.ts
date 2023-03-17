import express from "express";
import path from "node:path";
import renderReact from "./ssr/renderReact";
import { devMiddleware, hotMiddleware } from "../webpack.config";

const app = express();
const cwd = process.cwd();

if (process.env.NODE_ENV === "development") {
  app.use(devMiddleware);
  app.use(hotMiddleware);
}

// static assets server from the "build" folder
app.use(express.static(path.resolve(cwd, "build/public"), { index: false }));
app.use("/favicon.ico", express.static(path.resolve(cwd, "favicon.ico")));

app.use(express.json());
app.use(express.urlencoded());

app.get("/*", renderReact);

// 404 not found
app.use((req: Req, res: Res) => {
  return res.send("errors/404");
});

// unhandled error handling
app.use((err: any, req: Req, res: Res, next: Next) => {
  console.log(err);
  return res.json(err);
});

export default app;
