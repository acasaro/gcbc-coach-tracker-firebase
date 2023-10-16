require("dotenv").config();
const functions = require("firebase-functions");

const config = {
  discord_bot_token: "Discord Application Token",
};

if (process.env.FUNCTIONS_EMULATOR === "true") {
  config.discord_bot_token = process.env.DISCORD_BOT_TOKEN;
} else {
  config.discord_bot_token = functions.config().gcbc.discord_bot_token;
}

module.exports = {
  config,
};
