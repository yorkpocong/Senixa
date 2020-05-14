const {Command} = require("../../lib");

module.exports = class Leaderboard extends Command {
    constructor() {
        super("leaderboard", {
            description: "Shows the leaderboard",
            usage: "!leaderboard or !lb",
            aliases: ["lb"],
            cooldown: 5000
        });
    }

    async run(message) {
        const leaderboardEmbed = message.embed();
        const members = (await message.guild.db.members()).sort((a, b) => b.xp - a.xp).slice(0, 10);
        leaderboardEmbed.setDescription(members.map((member, i) => `${i + 1}. **${this.bot.users.cache.has(member.id) ? this.bot.users.cache.get(member.id).username : "Unknown"}** ${member.xp}XP : Level ${member.level}`));
        message.channel.send(leaderboardEmbed);
    }
};