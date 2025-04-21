module.exports = {
    name: 'flip',
    description: 'flips a coin, heads or tails',
    category: 'Fun',

    execute(message){
        message.channel.send(Math.random() < 0.5 ? 'Heads' : 'Tails');
    }
}