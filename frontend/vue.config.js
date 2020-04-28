const appVersion = require("./package.json").version;
process.env.VUE_APP_VERSION = appVersion;

module.exports = {};
