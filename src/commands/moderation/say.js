const {Command} = require("../../lib");

module.exports = class Say extends Command {
	constructor() {
		super("say", {
			description: "Basically echos your message",
			usage: `!say {your_message}`,
			cooldown: 5000
		});
	}

	async run(message, args) {
		message.delete();
		if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Invalid permissions.").then(msg => msg.delete(10000));
		let botMessage = args.join(" ");
	
		if(botMessage.length < 1) return message.channel.send("Please specify a message").then(msg => msg.delete(5000));
		message.channel.send(botMessage);
	}
};

// fik