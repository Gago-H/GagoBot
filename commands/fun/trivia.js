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

        message.channel.send('# GAME START 🚩\nYou have 1 minute to answer each question before it gets closed.\n');

        const scores = new Map();

        for (const question of data.results) {
            // if (question.type === 'multiple'){

            // }
            const allAnswers = [...question.incorrect_answers]; // copy incorrect_answers array to not mutate the original
            const correctIndex = Math.floor(Math.random() * (allAnswers.length + 1));
            allAnswers.splice(correctIndex, 0, question.correct_answer); // replace 0 items and insert the right answer at the correctIndex (rng)

            const optionLabels = ['A', 'B', 'C', 'D'];

            const answerChoices = allAnswers.map((ans, i) => ({
                label: `${optionLabels[i]}. ${decodeHTMLEntities(ans)}`,
                value: optionLabels[i]
            }));

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

            const sentMessage = await message.channel.send({ // send one question at a time
                embeds: [embed],
                components: [row]
            });

            const filter = i => i.customId === 'trivia_select';
            const collector = sentMessage.createMessageComponentCollector({ filter, time: 60000 }); // max 1 refers to the collector which ends after 1 interaction
            const answeredUsers = new Set();

            const collected = await new Promise(resolve => { // waits for either click or 60s timeout
                collector.on('collect', async i => {
                    const userId = i.user.id;
                    const userAnswer = i.values[0];
                    const correctLetter = optionLabels[correctIndex];

                    if (answeredUsers.has(userId)) {
                        await i.reply({ content: 'You already answered!', ephemeral: true });
                        return;
                    }

                    answeredUsers.add(userId);

                    await i.deferReply({ ephemeral: true });

                    if (userAnswer === correctLetter) {
                        const currentScore = scores.get(userId) || 0;
                        scores.set(userId, currentScore + 1);

                        await i.editReply({ content: '✅ Correct!' });
                    } else {
                        await i.editReply({ content: `❌ Wrong! The correct answer was **${correctLetter}. ${decodeHTMLEntities(question.correct_answer)}**.` });
                    }
                });

                collector.on('end', async collected => {
                    const disabledMenu = new StringSelectMenuBuilder()
                        .setCustomId('trivia_select')
                        .setPlaceholder(`Question Closed`)
                        .addOptions(answerChoices)
                        .setDisabled(true);

                    const disabledRow = new ActionRowBuilder().addComponents(disabledMenu);

                    await sentMessage.edit({ components: [disabledRow] });

                    console.log(`Correct answer: ${optionLabels[correctIndex]}. ${question.correct_answer}`);
                });
            });
        }

        if (scores.size > 0) {
            let leaderboard = '# 🏆 Final Scores:\n';

            for (const [userId, score] of scores) {
                const user = await message.client.users.fetch(userId);
                leaderboard += `${user.username}: **${score}** points\n\n`;
            }

            await message.channel.send({ content: leaderboard });
        } else {
            await message.channel.send({ content: "No one answered any questions!" });
        }
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
}

function decodeHTMLEntities(text) {
    return text.replace(/&quot;/g, '"')
        .replace(/&#039;/g, "'")
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>');
}