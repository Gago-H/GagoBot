const getCommandsByCategory = require('../../utils/getCommandsByCategory');

module.exports = {
  name: 'utilitycommands',
  description: 'Lists all utility commands',
  category: 'Utility',
  execute(message, args) {
    const utilityCommands = getCommandsByCategory(message.client.commands, 'Utility');

    if (utilityCommands.length === 0) {
      return message.channel.send('No utility commands found.');
    }

    let reply = '**🎉 Utility Commands:**\n\n';
    for (const cmd of utilityCommands) {
      reply += `• \`!${cmd.name}\` → ${cmd.description}\n`;
    }

    message.channel.send(reply);
  },
};