module.exports = {
    name: "roll",
    description: "Roll a number from 1 to X",
    category: "Fun",

    execute(message, args){
        let r = Math.floor(Math.random() * parseInt(args[0])) + 1;
        console.log(args[0], r);

        let msg;
        if (args[0] === '42069'){
            msg = "oh fuck yeah";
        }
        else msg = r.toString();

        message.channel.send(msg);
    }
}