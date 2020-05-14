  const {Command} = require("../../lib");

module.exports = class Tag extends Command {
    constructor() {
        super("prefix", {
            userPermissions: [" "],
            usage: "!prefix {prefix} {identifier}",
            cooldown: 5000
        })
    }

    run(message, args) {
      if(!message.member.hasPermission("MANAGE_GUILD", {checkAdmin: true, checkOwner: true}))
        return message.sm(":no_entry: You don't have permissions for that!", {type: "error"});
      
      if(!args[0])
        return message.sm(":no_entry: Please provide a prefix", {type: "error"});
      
    message.guild.db.prefix = args[0];
      message.guild.db.save();
      message.sm(`:white_check_mark: Successfully changed the prefix! to **${message.guild.db.prefix || "!"}**`);
    }
};