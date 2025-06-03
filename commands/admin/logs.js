const CheckPermissions = require("../../utils/CheckPermissions");
const logOffense = require('../../utils/logOffense');
const logData = require('../../utils/logs.json');

module.exports = {
    name: "logs",
    description: "Pulls logs of a user",
    category: "Admin",
    execute(message, args) {
        CheckPermissions(message);

        const target = message.mentions.members.first();
        if (!target) return message.reply('Please mention a user to view their logs.');

        const guildID = message.guild.id;
        const guildLogs = logData.guilds[guildID];

        // if (!guildLogs || !guildLogs.offenses) {
        //     return message.reply("No logs found for this server.");
        // }

        const userOffenses = guildLogs.offenses.filter(offense => offense.user_id === target.id);

        if (userOffenses.length === 0) {
            return message.reply(`No logs found for ${target.user.tag}.`);
        }

         const fields = userOffenses.map((offense, index) => ({
            name: `Offense ${index + 1}`,
            value: `**Type:** ${offense.offense_type}\n**Reason:** ${offense.reason}\n**Duration:** ${offense.duration || 'N/A'}\n**Date:** ${new Date(offense.date).toLocaleString()}\n**Admin:** ${offense.admin}`
        }));

        const embed = {
            color: 0x0099ff,
            title: `${target.user.tag}'s Offense Logs`,
            fields: fields,
            footer: { text: `Total offenses: ${userOffenses.length}` }
        };

        message.channel.send({ embeds: [embed] });

    }
}