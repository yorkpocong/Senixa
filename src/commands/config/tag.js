  const {Command} = require("../../lib");

module.exports = class Tag extends Command {
    constructor() {
        super("tag", {
            description: `Edit/Add/Remove Tags!`,
            example: "!tag edit donation donate here | [click me](https://google.com)",
            userPermissions: ["MANAGE_GUILD"],
            usage: "!tag {locale} {identifier} [title] | [description]",
            aliases: ["tags"],
            cooldown: 5000
        })
    }

    run(message, args) {
        const tagEmbed = message.embed()
            .setTitle("Tag")
            .setDescription([
                `**Add:** ${message.guild.db.prefix || "!"}tag add identifier title | description example: ${message.guild.db.prefix || "!"}tag add Donation hello | hey`,
                `**Edit:** ${message.guild.db.prefix || "!"}tag edit identifier title | description example: ${message.guild.db.prefix || "!"}tag edit Donation hello | hey`,
                `**Delete:** ${message.guild.db.prefix || "!"}tag remove identifier example: ${message.guild.db.prefix || "!"}tag remove Donation`,
                `**List:** ${message.guild.db.prefix || "!"}tag list`
            ].join("\n"));

        if (!args[0])
            return message.channel.send(tagEmbed);

        const query = args[0].toLowerCase();

        if ((!args[1] || !args[2]) && !["list", "delete", "remove"].includes(query))
            return message.channel.send(tagEmbed);

      if(!message.member.hasPermission("ADMINISTRATOR", {checkOwner: true}))
        return message.sm("You don't have perms for that!", {type: "error"});
        const [title, description] = args.slice(2).join(" ").split("|");
        if (["add", "create"].includes(query)) {
            if (message.guild.db.findTag(args[1]))
                return message.sm("That tag already exists!", {type: "error"});

            message.guild.db.addTag(args[1], {title, description});
        } else if (query === "list") {
            message.sm(message.guild.db.tags.map((log) => `\`${log.identifier}\``).join("\n"))
        } else if (query === "edit") {
            message.guild.db.editTag(args[1], {title, description});
        } else if (["delete", "remove"].includes(query)) {
            if (!message.guild.db.findTag(args[1]))
                return message.sm("That tag doesn't exists!", {type: "error"});

            message.guild.db.deleteTag(args[1]);
        } else return message.channel.send(tagEmbed);
        message.guild.db.save();
        if (query !== "list")
            message.sm(`Successfully ${query.endsWith("e") ? query + "d" : query + "ed"} that Tag!`);
    }
};