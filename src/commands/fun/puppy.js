const {Command} = require("../../lib");
const {MessageAttachment} = require("discord.js");
const fetch = require("node-fetch");
const randomPuppy = require("random-puppy");

module.exports = class Puppy extends Command {
    constructor() {
        super("puppy", {
            description: "woof woof, i need food",
            usage: "!puppy",
            aliases: ["puppy"],
            cooldown: 5000
        });
    }

    async run(message, args) {
        const subReddits = ["Corgi", "wigglebutts", "dogswithjobs", "bostonterrier", "blop", "dogshowerthoughts", "puppysmiles",];
        const random = subReddits[Math.floor(Math.random() * subReddits.length)];
        const img = await randomPuppy(random);
        const puppyEmbed = message.embed()
        .setImage(img)
        .setColor("RANDOM")
        
        message.channel.send(puppyEmbed)
    }
};

// wyayay