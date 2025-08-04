const CheckPermissions = require("../../utils/CheckPermissions");
const pool = require('../../utils/db');

module.exports = {
    name: "logs",
    description: "Pulls logs of a user",
    category: "Admin",
    async execute(message) {
        CheckPermissions(message);

        const target = message.mentions.members.first();
        if (!target) return message.reply('Please mention a user to view their logs.');

        const guildID = message.guild.id;

        try {
            const result = await pool.query(
                `SELECT * FROM offenses WHERE user_id = $1 AND guild_id = $2 ORDER BY date DESC`,
                [target.id, guildID]
            );

            const offenses = result.rows;

            if (offenses.length === 0) {
                return message.reply(`No logs found for ${target.user.tag}.`);
            }

            const embed = {
                color: 0xff0000,
                title: `${target.user.tag}'s Offense Logs`,
                fields: [],
                footer: { text: `Total offenses: ${offenses.length}` }
            };

            for (let i = 0; i < offenses.length; i++) {
                const o = offenses[i];

                const adminTagFetch = await message.client.users.fetch(o.admin_id);
                const adminTag = adminTagFetch.tag;

                embed.fields.push({
                    name: `Offense ${i + 1}`,
                    value: `**Type:** ${o.offense_type}\n**Reason:** ${o.reason}\n**Duration:** ${o.duration || 'N/A'}\n**Date:** ${new Date(o.date).toLocaleString()}\n**Admin:** ${adminTag}`
                });
            }

            message.channel.send({ embeds: [embed] });

        } catch (err) {
            console.error('Error fetching logs:', err);
            message.reply("There was an error retrieving logs.");
        }

    }
}