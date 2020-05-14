const { Event } = require("../../lib");
const Member = require("../../models/Member");
const fetch = require("node-fetch");
const ms = require("ms");
module.exports = class Ready extends Event {
  constructor() {
    super("logged-in");
  }

  run(bot) {
    // bot.channels.get("660146589796401152").messages.fetch("670951802820362253");

    const checkMembers = async () => {
      let members = await Member.find({});
      let toReturn = members.sort((a, b) => b.xp - a.xp).slice(0, 20);
      toReturn.forEach((member, i) => {
        toReturn[i] = {
          xp: member.xp,
          level: member.level,
          rank: i + 1,
          name: bot.users.cache.has(member.id)
            ? bot.users.cache.get(member.id).username
            : "Unknown"
        };
      });

      let mutedMembers = members.filter(member => member.muteTime > 0);
      if (mutedMembers[0])
        mutedMembers.forEach(mem => {
          if (mem.muteTime <= Date.now()) {
            const guild = bot.guilds.cache.get(mem.guildId);
            if (!guild) return;
            const member = guild.members.cache.get(mem.id);
            if (!member) return;
            const mutedRole = guild.roles.cache.find(
              role => role.name.toLowerCase() === "muted"
            );

            if (!member.roles.cache.has(mutedRole.id)) return;

            member.db.set("muteTime", 0);
            member.db.save();
            member.roles.remove(mutedRole);
          }
        });


      /*const botData = {
				users: bot.users.size,
				commandCount: bot.commands.size,
				commands: bot.commands.map((cmd) => ({
					name: cmd.name,
					aliases: cmd.aliases,
					category: cmd.category,
					options: cmd.options,
				})),
				uptime: ms(bot.uptime)
			};
			fetch("https://api.flexie.xyz/api/leaderboard", {
				method: "POST",
				body: JSON.stringify(toReturn),
				headers: {
					"Content-Type": "application/json"
				}
			});
			fetch("https://api.flexie.xyz/api/botData", {
				method: "POST",
				body: JSON.stringify(botData),
				headers: {
					"Content-Type": "application/json"
				}
			});
			 */
    };
                  bot.user.setPresence({
            activity: {
              name: "Restarting"

            }
          });
        setInterval(() => {
          const possible = [
            `With ${bot.users.cache.size} users`,
            `With ${bot.guilds.cache.size} servers`,
            `https://senixa.gg`
          ];
          bot.user.setPresence({
            activity: {
              name: possible[Math.floor(Math.random() * possible.length)]
            }
          });
        }, 15000);
    setInterval(checkMembers, 5000);
    console.log("Now ready");
  }
};
