const {Command} = require("../../lib");

module.exports = class Sayembed extends Command {
	constructor() {
		super("sayembed", {
			description: "echos your message but with a random color embed",
			usage: `!sayembed {member} [reason]`,
			cooldown: 5000
		});
	}

	async run(message, args) {
		message.delete();
if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Invalid permissions.").then(msg => msg.delete(10000));
    let botmessage = args.join(" ");
        let sayEmbed = message.embed()
        .setDescription(`${botmessage}.`)

        try{
            message.channel.send(sayEmbed);
            return
        }catch(e){
            // console.log(e.stack);
            console.log('\x1b[33m%s\x1b[0m', "Say Embed Error Occurred. Crash Prevented.");
            return
        }
	}
};

