const getCommandsByCategory = require('../../utils/getCommandsByCategory');

module.exports = {
  name: 'funcommands',
  description: 'Lists all fun commands',
  category: 'Utility',
  execute(message, args) {
    const funCommands = getCommandsByCategory(message.client.commands, 'Fun');

    if (funCommands.length === 0) {
      return message.channel.send('No fun commands found.');
    }

    let reply = '**🎉 Fun Commands:**\n\n';
    for (const cmd of funCommands) {
      reply += `• \`!${cmd.name}\` → ${cmd.description}\n`;
    }

    message.channel.send(reply);
  },
};