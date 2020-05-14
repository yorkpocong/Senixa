const {Command} = require("../../lib");
const moment = require("moment");

module.exports = class Profile extends Command {
    constructor() {
        super("profile", {
            description: "Shows the profile",
            usage: `!profile [user]`,
            aliases: ["profile"],
            cooldown: 5000
        });
    }

    async run(message, query) {
        let member;
        if (query[0]) member = await message.findMember(query.join(" "));
        if (!member) member = message.member;

        const profileEmbed = message.embed()
            .setTitle(`${member.user.username}'s Profile`)
            .setDescription(`This shows information about **${member.user.username}**`)
            .addField("Personal",
                [`**Username:** ${member.user.username}`,
                    `**ID:** ${member.id}`,
                    `**Created At:** ${moment(member.user.createdAt).format("dddd, MMMM Do YYYY")}`
                ].join("\n"))
            .addField("Server", [
                `**Nickname:** ${member.displayName}`,
                `**Highest Role:** ${member.roles.highest}`,
                `**Roles:** ${member.roles.cache.filter((r) => r.name !== "@everyone")
                    .sort((a, b) => b.position - a.position)
                    .map(String)
                    .join(", ")
                    .slice(0, 200)}`,
                `**Joined At:** ${moment(member.joinedAt).format("dddd, MMMM Do YYYY")}`,
                `**Level:** ${member.db.level}`,
                `**XP:** ${member.db.xp}`,
            ].join("\n"))
            
        
        message.channel.send(profileEmbed);
    }
};