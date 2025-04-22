module.exports = {
    name: 'flip',
    description: 'Flips a coin, heads or tails',
    category: 'Fun',

    execute(message){
        message.channel.send(Math.random() < 0.5 ? 'Heads' : 'Tails');
    }
}