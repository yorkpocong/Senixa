const {Structures} = require("discord.js");
const BobbyEmbed = require("./BobbyEmbed");

module.exports = () => Structures.extend("Message", Message =>
    class UnarityMessage extends Message {
        constructor() {
            super(...arguments);
        };

        sm(msg, {reply, type} = {type: "base", reply: false}) {
            if (!["base", "error"].includes(type)) options.type = "base";
            return reply ? this.reply(
                new BobbyEmbed(this.client)[type](msg, this.author)
                ) :
                this.channel.send(
                    new BobbyEmbed(this.client)[type](msg, this.author)
                )
        }

        embed(type = "base") {
            return new BobbyEmbed(this.client)[type](" ", this.author);
        }

        findMember(query) {
            return this.guild.findMember(this, query);
        }
    }
);
