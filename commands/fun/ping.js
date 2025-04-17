module.exports = {
    name: 'ping',
    description: 'Replies with pong',
    category: 'Fun',
    execute(message) {
      message.channel.send('pong');
    }
  };