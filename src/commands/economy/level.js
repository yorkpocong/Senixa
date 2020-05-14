const {Command} = require("../../lib");

module.exports = class Rank extends Command {
    constructor() {
        super("level", {
            description: "Shows the users level",
            usage:"level [user]",
            aliases: ["rank"],
            cooldown: 5000
        });
    }

    async run(message, query) {
        let member;
        if (query[0]) member = await message.findMember(query.join(" "));
        if (!member) member = message.member;

        const rankEmbed = message.embed()
            .setDescription(`**${member.user.username}** is level : **${member.db.level}**`);
            
        
        message.channel.send(rankEmbed);
    }
};