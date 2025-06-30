module.exports = {
    name: "8ball",
    description: "Ask the virtual 8ball a yes/no question and you will receive an answer",
    category: "Fun",
    execute(message, args) {
        const choices = [
            "It is certain", "It is decidedly so", "Without a doubt", "Yes definitely", "You may rely on it",
            "As I see it, yes", "Most likely", "Outlook good", "Yes", "Signs point to yes",
            "Reply hazy, try again", "Ask again later", "Better not tell you now", "Cannot predict now", "Concentrate and ask again",
            "Don't count on it", "My reply is no", "My sources say no", "Outlook not so good", "Very doubtful"
        ];

        let r = Math.floor(Math.random() * 20);
        const prompt = args.splice(0).join(' ');

        if (prompt === "Does Davo hate me?"){
            r = Math.floor(Math.random() * 10);
        }

        console.log(prompt);

        message.channel.send(choices[r]);
    }
}