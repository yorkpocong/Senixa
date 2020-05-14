const {Command} = require("../../lib");
const {MessageAttachment} = require("discord.js");
const fetch = require("node-fetch");
const randomPuppy = require("random-puppy");

module.exports = class ball8 extends Command {
    constructor() {
        super("sigh", {
            description: "sigh",
            usage: "sigh",
            aliases: ["sigh"],
            cooldown: 5000
        });
    }

    async run(message, args) {
        const ascii = `
        \`\`\`
          _______   _________    _________   ,        ,
         /              |       /            |        |
        |               |      |             |        |
        |               |      |             |        |
         \\_____,        |      |  _______,   |________|
                \\       |      |         |   |        |
                 |      |      |         |   |        |
                 |      |      |         |   |        |
          ______/   ____|____   \\________|   |        |
        \u200b
        \`\`\`
        `;
        
        message.sm(ascii)

    }
};

