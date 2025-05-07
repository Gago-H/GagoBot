const CheckPermissions = require('../../utils/CheckPermissions');

module.exports = {
    name: 'ban',
    description: 'Bans a user',
    category: 'Admin',
    async execute(message, args) {
        CheckPermissions(message);

        const target = message.mentions.members.first();
        let reason = '';
        for (const i in args){
            if (i > 0){
                reason += `${args[i]}`;
                if (i !== args.length - 1){
                    reason += ' ';
                }
            }
        }

        //console.log(userID);
        // try {
        //     if (!member) {
        //         message.reply("User not found in the server.");
        //         return;
        //     }

        //     if (!member.bannable) {
        //         message.reply("This user is not bannable.");
        //         return;
        //     }

        //     //await target.ban({ reason: reason });
            
        // } catch (error) {
        //     console.error("Error banning user:", error);
        //     message.reply("An error occurred while trying to ban the user.");
        // }

        message.reply(`${message.member} has banned ${target} for reason: ${reason}`);

    }
}