const {Event, random} = require("../../lib");

module.exports = class Message extends Event {
    constructor() {
        super("message-receive")
    }

    async run(bot, message) {
        if (message.author.bot) return;

        await message.guild.db;
        await message.member.db;
        await message.author.db;

        const prefix = message.guild.db.prefix || bot.config.prefix;
        const tagPrefix = ".";

        if (![prefix, tagPrefix].some((pre) => message.content.startsWith(pre))) {
            if (random(100, 1) > 70) {
                if (!message.member.db._member) return;
                message.member.db.add("xp", random(50, 5));
                if (message.member.db.xp > message.member.db.level * 130 + 5) {
                    await message.sm(`Level Up! New Level: ${message.member.db.level + 1}`).then(msg => msg.delete({timeout: 400}));
                    message.member.db.add("level", 1);
                }
                message.member.db.save();
            }
            return;
        }
        const [cmd, ...args] = message.content.trim().slice(prefix.length).split(" ");
        const command = bot.getCommand(cmd);
        try {
            if (command) {
                if (!bot.checkPerms(message.member, command.userPermissions))
                    return message.sm(`You don't have the required Permissions! Needed: ${command.userPermissions.join(" or ")}`);
                if (!bot.checkPerms(message.guild.me, command.botPermissions))
                    return message.sm(`I don't have the required Permissions! Needed: ${command.botPermissions.join(" and ")}`);
                if (command.options.devOnly && !message.author.db.dev)
                    return message.sm("You need Developer for this Command!", {type: "error"});
                await command.run(message, args)
            } else {
                const tag = message.guild.db.findTag(message.content.trim().slice(1).split(" ")[0]);
                if (tag) {
                    message.channel.send(message.embed()
                        .setTitle(tag.content.title)
                        .setDescription(tag.content.description))
                }
            }
        } catch (e) {
            console.error(e);
        }
    }
};