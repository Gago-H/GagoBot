const fs = require('fs');
const path = require('path');

module.exports = function logOffense(message, args, reason, target) {
    const logPath = path.join(__dirname, 'utils/logs.json');
            const logData = {
                admin: message.author.tag,
                admin_id: message.author.id,
                user: target.user.tag,
                user_id: target.id,
                offense_type: args[0],
                reason: reason,
                date: new Date().toISOString()
            };

            let logFile;
            try {
                logFile = JSON.parse(fs.readFileSync(logPath, 'utf-8'));
            } catch (error) {
                logFile = { guilds: {} };
            }

            const guildId = message.guild.id;

            if (!logFile.guilds[guildId]) {
                logFile.guilds[guildId] = { offenses: [] };
            }

            logFile.guilds[guildId].bans.push(logData);

            fs.writeFileSync(logPath, JSON.stringify(logFile, null, 2));
}