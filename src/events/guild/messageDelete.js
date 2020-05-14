const {Event} = require("../../lib");

module.exports = class GuildMemberAdd extends Event {
	constructor() {
		super("message-got-fucking deleted hell yeah nigg")
	}

	async run(bot, message) {
		bot.emit("logs", "messageDelete", { message })
	}
};