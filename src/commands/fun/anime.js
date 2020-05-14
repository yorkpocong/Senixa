const {Command} = require("../../lib");
const {MessageAttachment} = require("discord.js");
const fetch = require("node-fetch");
const randomPuppy = require("random-puppy");

module.exports = class Anime extends Command {
    constructor() {
        super("anime", {
            description: "anime is weird ngl",
            usage: "!anime",
            aliases: ["anime"],
            cooldown: 5000
        });
    }

    async run(message, args) {
        const subReddits = ["Anime_irl"];
        const random = subReddits[Math.floor(Math.random() * subReddits.length)];
        const img = await randomPuppy(random);
        const animeEmbed = message.embed()
        .setImage(img)
        .setColor("RANDOM")
        
        message.channel.send(animeEmbed)
    }
};