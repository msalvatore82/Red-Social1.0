const basicInfo = require("./basicInfo");
const tasks = require("./users");
const components = require("./components");
const users = require("./users");

module.exports = {
  ...basicInfo,
  ...users,
 ...components
};
