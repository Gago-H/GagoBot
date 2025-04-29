const fetch = require('node-fetch');
const { StringSelectMenuBuild, ActionRowBuilder, StringSelectMenuBuilder } = require('discord.js');

module.exports = {
    name: 'trivia',
    description: 'Starts a game of trivia based on options chosen, use !triviahelp to get started.',
    category: 'Fun',

    async execute(message, args) {
        urlAPI = buildURL(args);

        const response = await fetch(urlAPI);
        const data = await response.json();

        console.log(args);
        console.log(urlAPI);
        console.log(data);
        console.log(data.results.incorrect_answers);

        message.channel.send('# GAME START 🚩 SINGLE PLAYER ONLY\nYou have 1 minute to answer each question before it gets closed.\n');

        let score = 0;

        for (const question of data.results) {
            let answerChoices, optionLabels, correctAnswer, correctIndex;

            if (question.type === 'multiple') {
                const allAnswers = [...question.incorrect_answers];
                correctIndex = Math.floor(Math.random() * (allAnswers.length + 1));
                allAnswers.splice(correctIndex, 0, question.correct_answer);

                const optionLabels = ['A', 'B', 'C', 'D'];
                answerChoices = allAnswers.map((ans, i) => ({
                    label: `${optionLabels[i]}. ${decodeHTMLEntities(ans)}`,
                    value: optionLabels[i]
                }));

                correctAnswer = optionLabels[correctIndex];
            } else {
                answerChoices = ['True', 'False'].map(val => ({
                    label: val,
                    value: val
                }));

                correctAnswer = question.correct_answer === 'True' ? 'True' : 'False';
            }

            const embed = {
                color: 0x0099ff,
                title: decodeHTMLEntities(question.question),
                footer: { text: `Category: ${question.category} | Difficulty: ${question.difficulty}` }
            };

            const menu = new StringSelectMenuBuilder()
                .setCustomId('trivia_select')
                .setPlaceholder('Choose your answer')
                .addOptions(answerChoices);

            const row = new ActionRowBuilder().addComponents(menu);

            const sentMessage = await message.channel.send({
                embeds: [embed],
                components: [row]
            });

            const filter = i => i.customId === 'trivia_select' && i.user.id === message.author.id;
            const collector = sentMessage.createMessageComponentCollector({ filter, time: 15000, max: 1 });

            const collected = await new Promise(resolve => {
                collector.on('collect', async i => {
                    await i.deferReply({ ephemeral: true });

                    const userAnswer = i.values[0];

                    if (userAnswer === correctAnswer) {
                        score++;
                        await i.followUp({ content: '✅ Correct!' });
                    } else {
                        await i.followUp({ content: question.type === 'multiple' ? `❌ Wrong! The correct answer was **${correctAnswer}**. ${question.correct_answer}` : `❌ Wrong! The correct answer was **${correctAnswer}**` });
                    }

                    resolve(i);
                });

                collector.on('end', collected => {
                    if (collected.size === 0) resolve(null); // Timeout
                });
            });

            const disabledMenu = new StringSelectMenuBuilder()
                .setCustomId('trivia_select')
                .setPlaceholder(`Question Closed`)
                .addOptions(answerChoices)
                .setDisabled(true);

            const disabledRow = new ActionRowBuilder().addComponents(disabledMenu);

            await sentMessage.edit({ components: [disabledRow] });

            //console.log(`Correct answer: ${optionLabels[correctIndex]}. ${question.correct_answer}`);
        }


        await message.channel.send({
            content: `🏁 Game over! You got **${score}** out of **${data.results.length}** questions correct!`
        });
    }
}

function buildURL(args) {
    let baseurl = 'https://opentdb.com/api.php?';

    if (parseInt(args[0]) < 5 || parseInt(args[0]) > 30) {
        return message.reply("Please choose a number of questions from 5-30. Your selection is out of range.");
    } else {
        baseurl += `amount=${args[0]}`;
    }

    if (parseInt(args[1]) < 9 || parseInt(args[1]) > 32) {
        return message.reply("Please choose a category ID from the list provided. If you need to see the list use !triviahelp.")
    } else if (args[1] == 'any') {
        baseurl += '';
    } else {
        baseurl += `&category=${args[1]}`;
    }

    switch (args[2]) {
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

    switch (args[3]) {
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

    return baseurl;

    console.log(args);
    console.log(baseurl);
    console.log(data);
}

function decodeHTMLEntities(text) {
    return text.replace(/&quot;/g, '"')
        .replace(/&#039;/g, "'")
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>');
}