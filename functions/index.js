const functions = require("firebase-functions");
const logger = require("firebase-functions/logger");
const { config } = require("./config");
const { Client, GatewayIntentBits } = require("discord.js");

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

const DISCORD_TOKEN = config.discord_bot_token;
const CHANNEL_ID = "1067460388167352380";

client.once("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.login(DISCORD_TOKEN);

// Define a Firebase Function to trigger the bot action
exports.triggerDiscordBot = functions.https.onRequest(async (req, res) => {
  try {
    // Find the Discord channel or user you want to send a message to
    const logsChannel = client.channels.cache.get(CHANNEL_ID);

    // Send a message or trigger a /command
    if (logsChannel) {
      await logsChannel.send({ content: "GCBC Coach Tracker Updated Sheet", ephemeral: true });
      res.status(200).send("Message sent successfully.");
    } else {
      res.status(404).send("A problem occured");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error occurred.");
  }
});

exports.scheduledTask = functions.pubsub.schedule("every 24 hours").onRun(async (context) => {
  try {
    // Find the Discord channel or user you want to send a message to
    const targetChannel = client.channels.cache.get(CHANNEL_ID);

    // Send the /command or message
    if (targetChannel) {
      await targetChannel.send({
        content: "Hello from Firebase! This is your daily message.",
        ephemeral: true,
      });
      console.log("Command sent.");
    } else {
      console.error("Channel not found.");
    }
  } catch (error) {
    console.error(error);
  }
});
