const fetch = require('node-fetch');

module.exports = {
    name: 'triviahelp',
    description: 'Assists in starting a trivia game',
    category: 'Utility',

    async execute(message, args){
        const cl = await fetch('https://opentdb.com/api_category.php'); // category list
        const cldata = await cl.json();
        const cats = cldata.trivia_categories;

        let catlist = '# Trivia Categories 📝\n\n';

        for (const cat of cats){
            catlist += `**${cat.id}:** ${cat.name}\n`;
        }

        message.channel.send(`Here's some information about the trivia categories and questions:\n${catlist}\n\n`);

        message.channel.send(`## If you'd like to start a game of trivia, select your game options by writing the command.
        

**Number of Questions:** Write a number from 5-30 to choose how many questions you'd like for your game.

**Category:** Write the ID of the category you want or write "any" for any category. (Can't select more than one unless using "any")

**Difficulty:** Write easy | medium | hard or "any" for any difficulty.

**Game Type:** Write "mc" for multiple choice, "tf" for true/false, or "any" for any game type.
            
## E.g.
**!trivia 10 15 medium mc**

**!trivia 15 any any any**

**!trivia 12 31 hard tf**`);
        console.log(args);
    }
}