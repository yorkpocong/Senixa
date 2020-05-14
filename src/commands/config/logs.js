const {Command, searchQuery} = require("../../lib");
module.exports = class Commands extends Command {
	constructor() {
		super("logs", {
			description: "Sets the logs",
			usage: `!logs {log} {value}`,
			example: `!logs help`,
			aliases: ["log"],
			cooldown: 5000
		});
	}

	run(message, [query, value]) {
		const logEmbed = message.embed()
		.setTitle("Log Help")
		.setDescription([
			`**Help:** ${message.guild.db.prefix || "!"}logs help`,
			`**Disable:** ${message.guild.db.prefix || "!"}logs disable or ${message.guild.db.prefix || "!"}logs disable logName example: ${message.guild.db.prefix || "!"}logs disable ban`,
			`**Channel:** ${message.guild.db.prefix || "!"}logs channel Channel, example: ${message.guild.db.prefix || "!"}logs channel #logs`,
			`**Enable:** ${message.guild.db.prefix || "!"}logs enable or ${message.guild.db.prefix || "!"}logs enable logNaame, example: ${message.guild.db.prefix || "!"}logs enable all **or**  ${message.guild.db.prefix || "!"}logs enable ban, `
		].join("\n"))
		.addField("Log Names", "kick, mute, ban, clear, messagedelete, vcjoin, all");

		if (!query || query.toLowerCase() === "help") {
			message.channel.send(logEmbed);
		} else if (["disable", "enable"].includes(query.toLowerCase())) {
			const val = query.toLowerCase() === "enable";

			if (!value) return message.guild.db.log("all", val);
			if (!["kick", "clear", "ban", "mute", "vcjoin", "messagedelete", "all"].includes(value.toLowerCase()))
				return message.sm(":octagonal_sign: Please provide a valid `logName`,\n:octagonal_sign: for more information do `!help logs`", {type: "error"});

			message.guild.db.log(value.toLowerCase(), val);
			message.guild.db.log("all", true);
			message.guild.db.save();
			message.sm(
				`:white_check_mark: Successfully set **${value}** to **${val}**`
			);

		} else if (query.toLowerCase() === "channel") {
			if (!value) return message.sm("Please mention a channel!", {type: "error"});
			const channel = message.mentions.channels.first()
				|| message.guild.channels.get(value)
				|| message.guild.channels.find((channel) => searchQuery(value, channel.name));

			if (!channel)
				return message.sm(":octagonal_sign: Couldn't find that channel!", {type: "error"});

			message.guild.db.log("channel", channel.id);
			message.guild.db.save();
			message.sm(
				`:white_check_mark: Successfully set logs channel to **${channel}**!`
			);
		} else {
			message.channel.send(logEmbed);
		}
	}
};