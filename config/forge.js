if (process.env.NODE_ENV === "production") {
  module.exports = require("./forge_prod");
} else {
  module.exports = require("./forge_dev");
}
