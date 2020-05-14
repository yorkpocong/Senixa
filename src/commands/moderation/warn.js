const {Command} = require("../../lib");

module.exports = class extends Command {
    constructor() {
        super("warn");
    }

    run(message, args) {
        if (!message.member.hasPermission("KICK_MEMBERS", {checkAdmin: true, checkOwner: true}))
            return message.sm(":no_entry: You dont have perms for that!", {type: "error"});

        if (!args[0])
            return message.sm(":no_entry: Please provide a reason!", {type: "error"});

	if(!message.member.db.warns) message.member.db.warns = [];
        message.member.db.warns.push(args.join(" "))
        message.member.db.save();

        message.sm(":white_check_mark: Successfully warned that member!");
    }
}
