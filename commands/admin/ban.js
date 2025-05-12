const CheckPermissions = require('../../utils/CheckPermissions');
const logOffense = require('../../utils/logOffense');

module.exports = {
    name: 'ban',
    description: 'Bans a user',
    category: 'Admin',
    async execute(message, args) {
        CheckPermissions(message);

        const target = message.mentions.members.first();
        let reason = args.slice(1).join(' ') || "No reason provided.";

        try {
            if (!target) {
                message.reply("User not found in the server.");
                return;
            }

            // if (!target.bannable) {
            //     message.reply("This user is not bannable.");
            //     return;
            // }

            //await target.ban({ reason: reason });
            logOffense(message, args, reason, target);

            message.reply(`${message.member} has banned ${target} for reason: ${reason}`);
        } catch (error) {
            console.error("Error banning user:", error);
            message.reply("An error occurred while trying to ban the user.");
        }
    }
}