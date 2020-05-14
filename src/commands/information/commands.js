const {Command} = require("../../lib");
const {MessageAttachment} = require("discord.js");
const fetch = require("node-fetch");

module.exports = class Commands extends Command {
    constructor() {
        super("commands", {
            description: "Shows the list of commands",
            usage: "!help [command]",
            aliases: ["help"],
            cooldown: 5000
        });
    }

    run(message, [query]) {
        const helpEmbed = message.embed()
            .setAuthor("Senixa's Commands")
            .setDescription("[Invite me!](https://discordapp.com/api/oauth2/authorize?client_id=665956547020587010&permissions=8&scope=bot)")
            .setFooter("#StayHome | Senixa.gg")
           
        if (!query) {
            const categories = this.bot.commands.reduce((acc, val) => acc.includes(val.category) ? acc : [...acc, val.category], []);
            categories.forEach((cat) => {
                const commands = this.bot.commands.filter((cmd) => cmd.category === cat);
                helpEmbed.addField(cat[0].toUpperCase() + cat.slice(1), commands.map((cmd) => `\`${cmd.name}\``).join(", "));
            });
        } else {
            const command = this.bot.getCommand(query);

            if (!command) return message.sm("Couldn't find that command!");

            let str = "";
            if (command.options.description) str += `Description: ${command.options.description}\n`;
            if (command.options.aliases) str += `Aliases: ${command.options.aliases.join(", ")}\n`;
            if (command.options.usage) str += `Usage: ${command.options.usage}\n`;
            if (command.options.cooldown) str += `Cooldown: ${command.options.cooldown}ms`;

            helpEmbed
                .setTitle(`${command.name[0].toUpperCase() + command.name.slice(1)}'s information`)
                .setDescription(str);
        }
        return message.channel.send(helpEmbed);
    }
};