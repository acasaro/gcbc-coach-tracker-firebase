const functions = require("firebase-functions");
const { Client, GatewayIntentBits } = require("discord.js");

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const DISCORD_TOKEN = process.env.DISCORD_BOT_TOKEN;

client.once("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.login(DISCORD_TOKEN);

// Define a Firebase Function to trigger the bot action
exports.triggerDiscordBot = functions.https.onRequest(async (req, res) => {
  try {
    // Find the Discord channel or user you want to send a message to
    const targetChannel = client.channels.cache.get("CHANNEL_ID");

    // Send a message or trigger a /command
    if (targetChannel) {
      await targetChannel.send("Hello from Firebase!");
      res.status(200).send("Message sent.");
    } else {
      res.status(404).send("Channel not found.");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error occurred.");
  }
});
