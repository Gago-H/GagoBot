module.exports = {
    name: 'help',
    description: 'Lists command categories',
    category: 'Utility',
    execute(message, args){
        const categories = new Set();

        for (const cmd of message.client.commands.values()){
            categories.add(cmd.category || 'Uncategorized');
        }

        let reply = '**🧭 Command Categories:**\n\n';
        for (const category of categories) {
            reply += `• ${category} → \`!${category.toLowerCase()}commands\`\n`;
        }

        message.channel.send(reply);
    }
}