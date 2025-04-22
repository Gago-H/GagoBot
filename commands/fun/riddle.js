const fetch = require('node-fetch');

module.exports = {
    name: 'riddle',
    description: 'Get a random riddle and answer from https://riddles-api.vercel.app',
    category: 'Fun',

    async execute(message){
        const response = await fetch('https://riddles-api.vercel.app/random');

        const data = await response.json();
        message.channel.send(`Riddle: ${data.riddle}\nAnswer: || ${data.answer} ||`);
    }
}