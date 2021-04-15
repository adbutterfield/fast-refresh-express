import express from "express";
import path from "path";
import renderReact from "./renderReact";
import devMiddleware from "./devMiddleware";

const app = express();

if (process.env.NODE_ENV === "development") {
  devMiddleware(app);
}
app.use((req: Req, res: Res, next: Next) => {
  console.log(req.originalUrl);
  return next();
});

// static assets server from the "build/public" folder
app.use(
  express.static(path.join(__dirname, "../../build/public"), { index: false })
);
app.use(express.json());
app.use(express.urlencoded());

app.get(["/", "/*"], renderReact);

// 404 not found
app.use((req: Req, res: Res) => {
  return res.sendStatus(404);
});

// unhandled error handling
app.use((err: any, req: Req, res: Res, next: Next) => {
  console.log(err);
  return res.json(err);
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.info([`App is listening on port ${port}!`]);
});
