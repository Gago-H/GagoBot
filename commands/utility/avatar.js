module.exports = {
    name: 'avatar',
    description: 'Displays a users avatar',
    category: 'Utility',

    execute(message){
        const user = message.mentions.users.first() || message.author;

        message.channel.send(`${user.username}'s avatar:\n${user.displayAvatarURL({dynamic: true, size: 512})}`);
    }
}