const pool = require('./db');

async function logOffense(message, commandName, duration, reason, target) {
    const queryData = {
        adminId: message.author.id,
        userId: target.id,
        guildId: message.guild.id,
        offenseType: commandName,
        duration: duration,
        reason: reason,
        date: new Date().toISOString()
    }

    const query = `
        INSERT INTO offenses (admin_id, user_id, guild_id, offense_type, duration, reason, date)
        VALUES ($1, $2, $3, $4, $5, $6, $7)`;

    try {
        await pool.query(query, [
            queryData.adminId,
            queryData.userId,
            queryData.guildId,
            queryData.offenseType,
            queryData.duration,
            queryData.reason,
            queryData.date
        ]);
        console.log(`Logged offense for user ${queryData.userId}`);
    } catch (err) {
        console.error('Error logging offense:', err);
    }
}

module.exports = logOffense;
