const {Command} = require("../../lib");
const {MessageAttachment} = require("discord.js");
const fetch = require("node-fetch");
const randomPuppy = require("random-puppy");

module.exports = class Mock extends Command {
    constructor() {
        super("mock", {
            description: "MoCk pEoPle LiKe ThIs",
            usage: "!mock",
            aliases: ["mock"],
            cooldown: 5000
        });
    }

    async run(message, args) {
        message.delete()
        message.channel.send(args.join(" ").split("").map((x,i) => i%2?x.toUpperCase():x.toLowerCase()).join(""))

    }
};

