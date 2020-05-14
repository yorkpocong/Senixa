const {Command} = require("../../lib");

module.exports = class Clear extends Command {
	constructor() {
		super("clear", {
			description: "Clears the chat",
			usage: `!clear {amount} [reason]`,
			aliases: ["purge"],
			userPermissions: ["DELETE_MESSAGES"],
			botPermissions: ["DELETE_MESSAGES"],
			cooldown: 5000
		});
	}

	async run(message, args) {
		if (!args[0])
			return message.sm(":octagonal_sign: Provide an amount of messages to clear!", {type: "error"}).then(msg => msg.delete({timeout: 5000}));
		if (isNaN(args[0]) || args[0].includes("-") || args[0] > 100 || args[0] < 1)
			return message.sm(":octagonal_sign: Provide a positive amount between 1-100");

		await message.delete();

		const reason = args.slice(1).join(" ") || "No Reason";
		const messages = await message.channel.messages.fetch({limit: parseInt(args[0])});
		const deletedMessages = await message.channel.bulkDelete(messages);

		message.sm(`:white_check_mark: Successfully deleted **${deletedMessages.size}** messages!`).then(msg => msg.delete({timeout: 5000}));
		message.guild.db.increaseCase();

		this.bot.emit("logs", "clear", {
			messages: deletedMessages.size,
			channel: message.channel,
			reason,
			message
		});
	}
};