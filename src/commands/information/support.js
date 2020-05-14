  const {Command} = require("../../lib");

module.exports = class Support extends Command {
    constructor() {
        super("Support", {
            description: `shows the support server information!`,
            usage: "!support",
            aliases: ["support"],
          
        })
    }

    run(message, args) {
        const supportEmbed = message.embed()
            .setDescription('[Click me for our support server](https://discord.gg/KmnuMV2) or [Our website](https://bugscratchbot.wtf)')
            
            message.channel.send(supportEmbed)
    }

};