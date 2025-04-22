module.exports = {
    name: 'dadjoke',
    description: 'Get a random dadjoke from icanhazdadjoke',
    category: 'Fun',
    async execute(message){
        const fetch = require('node-fetch');

        const response = await fetch('https://icanhazdadjoke.com/', {
            headers: {
                Accept: 'application/json',
            },
        });

        const data = await response.json();
        message.channel.send(data.joke)
    }
}