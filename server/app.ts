import express from "express";
import path from "node:path";
import renderReact from "./renderReact";
import devMiddleware from "./devMiddleware";

const app = express();

if (process.env.NODE_ENV === "development") {
  devMiddleware(app);
}

// static assets server from the "build" folder
app.use(
  express.static(path.resolve(process.cwd(), "build/public"), { index: false })
);
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
