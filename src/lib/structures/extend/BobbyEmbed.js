const {MessageEmbed} = require("discord.js");

module.exports = class BobbyEmbed extends MessageEmbed {
    constructor(bot) {
        super(...arguments);
        this.bot = bot;
    }

    base(msg, user) {
        return this
            .setDescription(msg)
            .setColor("#FFFFFF")


    }

    error(err, user) {
        return this
            .base(err, user)
            .setColor("#ff0000")
    }
};