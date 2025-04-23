const fetch = require('node-fetch');

module.exports = {
    name: 'trivia',
    description: 'Starts a game of trivia based on options chosen, use !triviahelp to get started.',
    category: 'Fun',

    async execute(message, args){
        let baseurl = 'https://opentdb.com/api.php?';

        if (parseInt(args[0]) < 5 || parseInt(args[0]) > 30){
            return message.reply("Please choose a number of questions from 5-30. Your selection is out of range.");
        } else {
            baseurl += `amount=${args[0]}`;
        }

        if (parseInt(args[1]) < 9 || parseInt(args[1]) > 32){
            return message.reply("Please choose a category ID from the list provided. If you need to see the list use !triviahelp.")
        } else if (args[1] == 'any') {
            baseurl += '';
        } else {
            baseurl += `&category=${args[1]}`;
        }

        switch(args[2]){
            case 'any':
                break;
            case 'easy':
                baseurl += `&difficulty=${args[2]}`;
                break;
            case 'medium':
                baseurl += `&difficulty=${args[2]}`;
                break;
            case 'hard':
                baseurl += `&difficulty=${args[2]}`;
                break;
            default:
                return message.reply("Please choose a difficulty: any, easy, medium, hard. ");
        }

        switch(args[3]){
            case 'any':
                break;
            case 'mc':
                baseurl += `&type=multiple`;
                break;
            case 'tf':
                baseurl += `&type=boolean`;
                break;
            default:
                return message.reply("Please choose a game type: any, mc, tf. (mc = multiple choice, tf = true/false)");
        }

        const response = await fetch(baseurl);

        const data = await response.json();

        
        console.log(args);
        console.log(baseurl);
        console.log(data);
    }
}