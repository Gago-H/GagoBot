const fetch = require('node-fetch');

module.exports = {
    name: 'quote',
    description: 'Get a random quote from https://zenquotes.io/api/quotes/',
    category: 'Fun',

    async execute(message){
        const response = await fetch('https://zenquotes.io/api/random');
        
        const data = await response.json();
        message.channel.send(`"${data[0]["q"]}"\n — ${data[0]["a"]}`);
        //message.channel.send(`"${data.q}" — ${data.a}`);
    }
}