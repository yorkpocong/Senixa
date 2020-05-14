const {Event, BobbyEmbed} = require("../../lib");

module.exports = class Logs extends Event {
	constructor() {
		super("log-receive")
	}

	async run(bot, log, data) {
		const guild = data.message ? data.message.guild : data.guild;

		if (!guild.db
			|| !guild.db.logs
			|| !guild.db.logs[log]
			&& !guild.db.logs.all
			|| guild.db.logs.channel === "none") return;

		const logChannel = guild.channels.cache.get(guild.db.logs.channel);
		if (!logChannel) return;

		const logEmbed = new BobbyEmbed(bot)["base"](" ", data.message ? data.message.author : data.member.user);
		switch (log) {
			case "messageDelete": // 
				logEmbed
				.setTitle(`Deleted Message`)
				.setDescription(
					[`**Message By:** ${data.message.author.username}`,
						`**Channel:** ${data.message.channel}`,
						`**Content:** ${data.message.content.length > 1000 ? data.message.content.slice(0, 1000) + "..." : data.message.content}`
					].join("\n"));
				break;
			case "vcJoin": //
				logEmbed
				.setTitle(`VoiceChannel Join`)
				.setDescription(
					[`**Member:** ${data.member}`,
						`**Channel:** ${data.channel}`,
					].join("\n"));
				break;
			case "kick": //
				logEmbed
				.setTitle(`**Kick**[Case: ${guild.db.case}]`)
				.setDescription(
					[`**Kicked Member:** ${data.member.user.username}(${data.member.id})`,
						`**Kicked By:** ${data.message.author.username}`,
						`**Reason:** ${data.reason}`,
						`**Channel:** ${data.message.channel}`
					].join("\n"));
				break;
			case "ban": //
				logEmbed
				.setTitle(`**Ban**[Case: ${guild.db.case}]`)
				.setDescription(
					[`**Banned Member:** ${data.member.user.username}(${data.member.id})`,
						`**Banned By:** ${data.message.author.username}`,
						`**Reason:** ${data.reason}`,
						`**Channel:** ${data.message.channel}`
					].join("\n"));
				break;
				case "all":
					logEmbed
					.setTitle(`Deleted Message`)
					.setDescription(
						[`**Message By:** ${data.message.author.username}`,
							`**Channel:** ${data.message.channel}`,
							`**Content:** ${data.message.content.length > 1000 ? data.message.content.slice(0, 1000) + "..." : data.message.content}`
						].join("\n"));
					break;
				case "all":
					logEmbed
					.setTitle(`VoiceChannel Join`)
					.setDescription(
						[`**Member:** ${data.member}`,
							`**Channel:** ${data.channel}`,
						].join("\n"));
					break;
				case "all":
					logEmbed
					.setTitle(`**Kick**[Case: ${guild.db.case}]`)
					.setDescription(
						[`**Kicked Member:** ${data.member.user.username}(${data.member.id})`,
							`**Kicked By:** ${data.message.author.username}`,
							`**Reason:** ${data.reason}`,
							`**Channel:** ${data.message.channel}`
						].join("\n"));
					break;
				case "all":
					logEmbed
					.setTitle(`**Ban**[Case: ${guild.db.case}]`)
					.setDescription(
						[`**Banned Member:** ${data.member.user.username}(${data.member.id})`,
							`**Banned By:** ${data.message.author.username}`,
							`**Reason:** ${data.reason}`,
							`**Channel:** ${data.message.channel}`
						].join("\n"));
					break;
					case "all":
						logEmbed
						.setTitle(`**${log[0].toUpperCase() + log.slice(1)}**[Case: ${guild.db.case}]`)
						.setDescription(
							[`**Cleared By:** ${data.message.author.username}`,
								`**Reason:** ${data.reason}`,
								`**Amount:** ${data.messages}`,
								`**Channel:** ${data.message.channel}`
							].join("\n"));
						break;
			case "clear": //
				logEmbed
				.setTitle(`**${log[0].toUpperCase() + log.slice(1)}**[Case: ${guild.db.case}]`)
				.setDescription(
					[`**Cleared By:** ${data.message.author.username}`,
						`**Reason:** ${data.reason}`,
						`**Amount:** ${data.messages}`,
						`**Channel:** ${data.message.channel}`
					]);
				break;
		}
		logChannel.send(logEmbed);
	}
};

