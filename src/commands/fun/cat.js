const {Command} = require("../../lib");
const {MessageAttachment} = require("discord.js");
const fetch = require("node-fetch");
const randomPuppy = require("random-puppy");

module.exports = class Cat extends Command {
    constructor() {
        super("cat", {
            description: "meow meow bro",
            usage: "!cat",
            aliases: ["cat"],
            cooldown: 5000
        });
    }

    async run(message, args) {
        const subReddits = ["JellyBeanToes", "CatsStandingUp", "CatsonGlass", "Cats", "Kittens", "CatLoaf", "CatsvsTechnology", "CatsInBusinessAttire", "Blep", "Meow_Irl", "TuckedInKitties","CatsInSinks", "StartledCats", "CatReactionGifs", "CatPranks", "StuffonCats", "Floof", "CatHighFive"];
        const random = subReddits[Math.floor(Math.random() * subReddits.length)];
        const img = await randomPuppy(random);
        const memeEmbed = message.embed()
        .setImage(img)
        .setColor("RANDOM")
        
        message.channel.send(memeEmbed)
    }
};