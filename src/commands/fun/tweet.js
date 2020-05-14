const {Command} = require("../../lib");
const {MessageAttachment} = require("discord.js");
const fetch = require("node-fetch");

module.exports = class Tweet extends Command {
    constructor() {
        super("tweet", {
            description: "Yes",
            usage: "!tweet xyz | zyx",
            aliases: ["twitter"],
            userPermissions: ["ADMINISTRATOR"],
            cooldown: 5000
        });
    }

    async run(message, args) {

        let m = await message.channel.send("Senpai.. wait...");
        let [username, ...text] = args.join(" ").split("|");
        text = text.join(" ").trim();
        if (!username)
            return m.edit("No Username >:(?");
        if (!text)
            return m.edit("Huh, there ain't no text?!");

        try {
            const res = await (await fetch(
                encodeURI(`https://nekobot.xyz/api/imagegen?type=tweet&username=${username}&text=${text}`))).json();
            let attachment = new MessageAttachment(res.message, "tweet.png");
            await message.channel.send(attachment);
            m.delete(200);
        } catch (e) {
            console.log(e);
            m.edit("Fuck an error");
        }
    }
};