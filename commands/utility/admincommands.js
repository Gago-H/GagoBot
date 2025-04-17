const getCommandsByCategory = require('../../utils/getCommandsByCategory');

module.exports = {
  name: 'admincommands',
  description: 'Lists all admin commands',
  category: 'Utility',
  execute(message, args) {
    const adminCommands = getCommandsByCategory(message.client.commands, 'Admin');

    if (adminCommands.length === 0) {
      return message.channel.send('No admin commands found.');
    }

    let reply = '**🎉 Admin Commands:**\n\n';
    for (const cmd of adminCommands) {
      reply += `• \`!${cmd.name}\` → ${cmd.description}\n`;
    }

    message.channel.send(reply);
  },
};