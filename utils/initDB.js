const pool = require('./db');

const createTable = `
CREATE TABLE IF NOT EXISTS offenses (
    id SERIAL PRIMARY KEY,
    admin_id TEXT NOT NULL,
    user_id TEXT NOT NULL,
    guild_id TEXT NOT NULL,
    offense_type TEXT NOT NULL,
    duration TEXT,
    reason TEXT NOT NULL,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`;

pool.query(createTable)
    .then(() => {
        console.log("✅ offenses table created");
        process.exit();
    })
    .catch(err => {
        console.error("❌ Error creating table:", err);
        process.exit(1);
    });