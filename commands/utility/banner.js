module.exports = {
    name: 'banner',
    description: 'Displays a users banner',
    category: 'Utility',

    execute(message){
        const user = message.mentions.users.first() || message.author;

        message.channel.send(`${user.username}'s banner:\n${user.displayBannerURL({dynamic: true, size: 512})}`);
    }
}