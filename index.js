require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');

// Create a new client instance
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

// When the bot is ready
client.once('ready', () => {
  console.log(`✅ Logged in as ${client.user.tag}`);
});

// When a message is sent
client.on('messageCreate', message => {
  if (message.author.bot) return; // ignore other bots

  if (message.content === '!ping') {
    message.channel.send('Pong!');
  }
});

// Log in to Discord
client.login(process.env.DISCORD_TOKEN);