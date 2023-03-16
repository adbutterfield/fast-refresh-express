const path = require("node:path");

require("dotenv-defaults/config");
require("@babel/register")({ extensions: [".js", ".ts", ".tsx"] });
require("../server").default;
