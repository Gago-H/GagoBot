const fs = require('fs');
const path = require('path');

module.exports = function logOffense(message, commandName, duration, reason, target) {
    const logPath = path.join(__dirname, 'logs.json');
            const logData = {
                admin: message.author.tag,
                admin_id: message.author.id,
                user: target.user.tag,
                user_id: target.id,
                offense_type: commandName,
                duration: duration,
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

            logFile.guilds[guildId].offenses.push(logData);
            fs.writeFileSync(logPath, JSON.stringify(logFile, null, 2));
}