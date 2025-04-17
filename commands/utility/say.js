module.exports = {
    name: 'say',
    description: 'Repeats the message back',
    category: 'Utility',
    execute(message, args) {
      const text = args.join(' ');
      if (text.trim().length === 0) {
        message.channel.send("You didn’t say anything!");
      } else {
        message.channel.send(text);
      }
    }
  };