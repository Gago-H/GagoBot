module.exports = {
    name: 'unmute',
    description: 'Unmutes a user manually',
    category: 'Admin',
    async execute(message, args) {
      if (!message.member.permissions.has('MANAGE_ROLES')) {
        return message.reply("You don't have permission to unmute members.");
      }
  
      const target = message.mentions.members.first();
      if (!target) return message.reply('Please mention a user to unmute.');
  
      const mutedRole = message.guild.roles.cache.find(role => role.name === 'Muted');
      if (!mutedRole) return message.reply('Muted role not found.');
  
      try {
        await target.roles.remove(mutedRole);
        message.channel.send(`${target.user.tag} has been unmuted.`);
      } catch (err) {
        console.error(err);
        message.reply('There was an error unmuting the user.');
      }
    }
  };