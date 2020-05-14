const {Command} = require("../../lib");
const {MessageAttachment} = require("discord.js");
const fetch = require("node-fetch");
const randomPuppy = require("random-puppy");

module.exports = class Invite extends Command {
    constructor() {
        super("invite", {
            description: "invite me to your server yeah!",
            usage: "!invite",
            aliases: ["invite"],
            cooldown: 5000
        });
    }

    async run(message, args) {

        const inviteEmbed = message.embed()
      .setDescription('[click me!](https://discordapp.com/api/oauth2/authorize?client_id=665956547020587010&permissions=8&scope=bot)')
        
  message.channel.send(inviteEmbed)
    }
};