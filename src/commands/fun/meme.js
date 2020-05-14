const {Command} = require("../../lib");
const {MessageAttachment} = require("discord.js");
const fetch = require("node-fetch");
const randomPuppy = require("random-puppy");

module.exports = class Meme extends Command {
    constructor() {
        super("meme", {
            description: "you ask for a meme you get one",
            usage: "!meme",
            aliases: ["meme"],
            cooldown: 5000
        });
    }

    async run(message, args) {
        const subReddits = ["dankmeme", "MemeEconomy", "me_irl", "ComedyCentral", "memes", "PrequeMemes", "terriblefacebookmemes",];
        const random = subReddits[Math.floor(Math.random() * subReddits.length)];
        const img = await randomPuppy(random);
        const memeEmbed = message.embed()
        .setImage(img)
        .setColor("RANDOM")
        
        message.channel.send(memeEmbed)
    }
};