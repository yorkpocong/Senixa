const {Command} = require("../../lib");
const {MessageAttachment} = require("discord.js");
const fetch = require("node-fetch");


module.exports = class Slots extends Command {
    constructor() {
        super("slots", {
            description: "slots",
            usage: "!slots",
            aliases: ["slots"],
            cooldown: 5000
        });
    }

    async run(message, args) {
        
        let slots = ["🍎", "🍌", "🍒", "🍓", "🍈"];
        let result1 = Math.floor((Math.random() * slots.length));
        let result2 = Math.floor((Math.random() * slots.length));
        let result3 = Math.floor((Math.random() * slots.length));
        let name = message.author.displayName;
        let aicon = message.author.displayAvatarURL;

        if (slots[result1] === slots[result2] && slots[result3]) {
            let wEmbed = message.embed()
                .setTitle("Winner Winner, Chicken Dinner")
                .setColor("GREEN")
                .setDescription(slots[result1] + slots[result2] + slots[result3], true)
            message.channel.send(wEmbed)
        } else {
            let embed = message.embed()
                .setTitle('Fucking Lost, Better luck next time!!')
                .setColor("RED")
                .setDescription(slots[result1] + slots[result2] + slots[result3], true)
            message.channel.send(embed)
        }

    }
};