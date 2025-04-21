const fetch = require('node-fetch');

module.exports = {
    name: 'quote',
    description: 'fetches a random quote from https://zenquotes.io/api/quotes/',
    category: 'Fun',

    async execute(message){
        const response = await fetch('https://zenquotes.io/api/random');
        
        const data = await response.json();
        message.channel.send(`"${data.q}" — ${data.a}`);
    }
}