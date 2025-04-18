module.exports = {
    name: 'mute',
    description: 'Mutes a user for a specified time (e.g., 10s, 5m, 2h)',
    category: 'Admin',
    async execute(message, args) {
      if (!message.member.permissions.has('MANAGE_ROLES')) { // make sure the user has access to admin commands
        return message.reply("You don't have permission to mute members.");
      }
  
      const target = message.mentions.members.first(); // user mentioned
      const timeArg = args[1]; // e.g. 10h
  
      if (!target) return message.reply('Please mention a user to mute.'); // value amount
      if (!timeArg || !/^(\d+)(s|m|h)$/.test(timeArg)) { // duration type
        return message.reply('Please provide a valid duration (e.g., 10s, 5m, 2h).');
      }
  
      const amount = parseInt(timeArg.slice(0, -1)); //splits the timeArg
      const unit = timeArg.slice(-1);
  
      let durationMs; // setTimeout uses ms so we need to convert to s, m, h
      switch (unit) {
        case 's': durationMs = amount * 1000; break;
        case 'm': durationMs = amount * 60 * 1000; break;
        case 'h': durationMs = amount * 60 * 60 * 1000; break;
        default:
          return message.reply('Invalid time format. Use s, m, or h.');
      }
  
      const mutedRole = message.guild.roles.cache.find(role => role.name === 'Muted');
      if (!mutedRole) return message.reply('Muted role not found. Please create it first.');
  
      try {
        await target.roles.add(mutedRole);
        message.channel.send(`${target.user.tag} has been muted for ${amount}${unit}.`); // mute user for X amount
  
        setTimeout(async () => { // wait out the mute
          // Only remove the role if they still have it
          if (target.roles.cache.has(mutedRole.id)) {
            await target.roles.remove(mutedRole);
            message.channel.send(`${target.user.tag} has been unmuted.`);
          }
        }, durationMs);
      } catch (err) {
        console.error(err);
        message.reply('There was an error muting the user.');
      }
    }
  };
  