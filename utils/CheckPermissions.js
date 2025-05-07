const { PermissionsBitField } = require("discord.js");

module.exports = function CheckPermissions(message) {
    if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) { // make sure the user has access to admin commands
        return message.reply("You don't have permission to mute members.");
      }
}