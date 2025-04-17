module.exports = function getCommandsByCategory(commands, categoryName) {
    return Array.from(commands.values()).filter(
      cmd => (cmd.category || '').toLowerCase() === categoryName.toLowerCase()
    );
  };