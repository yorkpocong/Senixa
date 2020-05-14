const {Event} = require("../../lib");

module.exports = class MessageReactionAdd extends Event {
    constructor() {
        super("reaction-add")
    }

    async run(bot, reaction, user) {
        const {message, emoji} = reaction;
        if (message.id === "670951802820362253") {
            if (emoji.name === "✅") {
                if (message.guild.channels
                    .filter(x => x.parentID === "670951245577715732")
                    .some(x => x.topic === user.id)) return;
                if (!message.guild.channels.has("670951245577715732")) return;
                message.guild.channels.create(`Ticket-${user.username}`, {
                    type: "text",
                    parent: "670951245577715732",
                    topic: user.id,
                    permissionOverwrites: [
                        {
                            id: user.id,
                            allow: ["VIEW_CHANNEL", "SEND_MESSAGES"]
                        },
                        {
                            id: message.guild.id,
                            deny: ["VIEW_CHANNEL", "SEND_MESSAGES"]
                        }
                    ]
                })
            } else if (emoji.name === "❌") {
                const channel = message.guild.channels.find((ch) => ch.topic === user.id);
                if (!channel) return;
                channel.delete();
            }
        }
    }
};