const {Client, Collection} = require("discord.js");
const {readdirSync} = require("fs");
module.exports = class BobbieClient extends Client {
    constructor(token, options) {
        super(options);
        super.login(token);
        this.commands = new Collection();
    }

    loadCommands(dir) {
        if (!dir) throw Error("No Command Dir Detected.");
        try {
            console.log("Loading Commands");
            readdirSync(dir).forEach((category) => {
                console.log(`-----${category}-----`)
                readdirSync(`${dir}/${category}`).filter((cmd) => cmd.endsWith(".js")).forEach((command) => {
                    try {
                        let cmd = require(`${dir}/${category}/${command}`);
                        cmd = new cmd();
                        cmd.bot = this;
                        cmd.category = category;
                        this.commands.set(cmd.name, cmd);
                        console.log(`Loaded: ${command}`);
                    } catch (e) {
                        console.log(`Error: ${command} => ${e}`);
                    }
                });
            });

        } catch (e) {
            console.log(`Error: => ${e}`);
        }

    }

    loadEvents(dir) {
        if (!dir) throw Error("No Event Dir Detected");
        try {
            console.log("Loading Events");
            readdirSync(dir).forEach((category) => {
                readdirSync(`${dir}/${category}`).filter((evt) => evt.endsWith(".js")).forEach((event) => {
                    try {
                        let evt = require(`${dir}/${category}/${event}`);
                        event = event.split(".js")[0];
                        evt = new evt();
                        evt.bot = this;
                        this.on(event, evt.run.bind(null, this));
                        console.log(`Loaded: ${evt.name}`);
                    } catch (e) {
                        console.log(`Error: ${event} => ${e}`);
                    }
                });
            });
        } catch (e) {
            console.log(`Error: => ${e}`);
        }
    }

    checkPerms(member, permissions) {
        if (!permissions || !permissions[0]) return true;
        if (!Array.isArray(permissions)) return member.hasPermission(permissions, {
            checkAdmin: true,
            checkOwner: true
        }) || member.user.db.dev;
        return permissions.some((perm) => member.hasPermission(perm, {
            checkAdmin: true,
            checkOwner: true
        })) || member.user.db.dev;
    }

    getCommand(command) {
        return this.commands.get(command) || this.commands.find((cmd) => cmd.options.aliases ? cmd.options.aliases.includes(command) : false) || false;
    }
};