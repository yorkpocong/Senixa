const {Command} = require("../../lib");


module.exports = class Translate extends Command {
    constructor() {
        super("translate", {
            description: "translates a text or piece of message",
            usage: "translate <language> to <language>",
            aliases: ["language"],
            cooldown: 5000
        });
    }

    async run(message, args) {
        message.sm(`Hello **${member.user.username}** this command is currently under development, tune back in later!`).then(msg => msg.delete({timeout: 10000}));
    }          
          };
     
          
