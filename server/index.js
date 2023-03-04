const path = require("node:path");

require("dotenv-defaults/config");
require("@swc/register")({
  extensions: [".js", ".ts", ".tsx"],
  configFile: path.resolve(process.cwd(), "swc.config.json"),
});
const app = require("./app.ts").default;

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.info([`App is listening on port ${port}!`]);
});
