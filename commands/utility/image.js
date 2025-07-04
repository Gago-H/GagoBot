const axios = require('axios');
require('dotenv').config();

module.exports = {
    name: 'image',
    description: 'Searches Google Images and returns the first result',
    category: 'Fun',
    async execute(message, args) {
        const query = args.join(' ');
        if (!query) return message.reply('Please enter a search term.');

        const apiKey = process.env.SERPAPI_KEY;
        const url = `https://serpapi.com/search.json?q=${encodeURIComponent(query)}&tbm=isch&api_key=${apiKey}`;

        try {
            const response = await axios.get(url);
            const images = response.data.images_results;

            if (!images || images.length === 0) {
                return message.reply("No images found.");
            }

            let index = 0;

            const embed = (img) => ({
                color: 0x0099ff,
                title: `**Image results for:** ${query} (${index + 1}/${images.length})`,
                image: { url: img.original },
                footer: {text: `Use ⬅️ and ➡️ to navigate`}
            });

            const embedMessage = await message.channel.send({ embeds: [embed(images[index])] });

            await embedMessage.react('⬅️');
            await embedMessage.react('➡️');

             const filter = (reaction, user) =>
                ['⬅️', '➡️'].includes(reaction.emoji.name) && user.id === message.author.id;

             const collector = embedMessage.createReactionCollector({ filter, time: 60000 });

             collector.on('collect', (reaction, user) => {
                reaction.users.remove(user); 

                if (reaction.emoji.name === '⬅️') {
                    index = (index - 1 + images.length) % images.length;
                } else if (reaction.emoji.name === '➡️') {
                    index = (index + 1) % images.length;
                }

                embedMessage.edit({ embeds: [createEmbed(images[index])] });
            });

            collector.on('end', () => {
                embedMessage.reactions.removeAll().catch(console.error);
            });
        } catch (err) {
            console.error(err);
            message.reply("There was an error fetching the image.");
        }
    }
};
