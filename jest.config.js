const { readFileSync } = require("fs");

const config = JSON.parse(
  readFileSync(`${__dirname}/swc.config.json`, "utf-8")
);

module.exports = {
  transform: {
    "^.+\\.(t|j)sx?$": ["@swc/jest", config],
  },
};
