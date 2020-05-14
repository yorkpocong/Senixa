const {Command} = require("../../lib");
const {MessageAttachment} = require("discord.js");
const fetch = require("node-fetch");
const randomPuppy = require("random-puppy");

module.exports = class ball8 extends Command {
    constructor() {
        super("8ball", {
            description: "8ball me",
            usage: "!8ball {question}",
            aliases: ["8ball"],
            cooldown: 5000
        });
    }

    async run(message, args) {
        
        function doMagic8BallVoodoo() {
            var rand = ['My GPU is saying yep', 'My CPU is saying no', 'Why are you even trying?', 'What do you think? NO', 'Baby baby maybe ohhh', 'Never for you', 'What the hell bro hell yeah', "Stop speaking", "Sure, why not", "My sources are saying no", "what are you fucking gay? no of course", "sure, just send it for the boys", "sure, but im not responsible", "your retarded cunt, NO", "no simp", "yes simp", "no papi", "yes papi", "no pepega", "yes pepega"];
        
            return rand[Math.floor(Math.random()*rand.length)];
        }
        
        message.channel.send(`<@${message.author.id}> ` + doMagic8BallVoodoo())

    }
};

