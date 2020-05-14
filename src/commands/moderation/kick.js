const {Command} = require("../../lib");

module.exports = class Kick extends Command {
    constructor() {
        super("kick", {
            description: "Kicks a member",
            usage: `!kick {member} [reason]`,
            userPermissions: ["KICK_MEMBERS"],
            botPermissions: ["KICK_MEMBERS"],
            cooldown: 5000
        });
    }

    async run(message, args) {
        if (!args[0]) return message.sm("Mention a Member to kick!", {type: "error"}).then(msg => msg.delete({timeout: 5000}));

      if(!message.member.hasPermission("KICK_MEMBERS", { checkAdmin: true, checkOwner: true }))
        return message.sm("You dont have perms for that!", { type: "error"})
        const member = await message.findMember(args[0]);
        const reason = args.slice(1).join(" ") || "No Reason";

        if (!member) return message.sm("Couldn't find that member!", {type: "error"}).then(msg => msg.delete({timeout: 5000}));
        if (member.roles.highest.position > message.member.roles.highest.position && message.member.id !== message.guild.owner.id)
            return message.sm("You can't kick that Member!", {type: "error"});

        member.kick({reason});
        message.guild.db.increaseCase();
        message.sm("Kicked that Member!").then(msg => msg.delete(5000));
        this.bot.emit("logs", "kick", {reason, member, message});
    }
};