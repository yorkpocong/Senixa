module.exports = class Command {
    constructor(name, options, perms) {
        this.name = name;
        this.userPermissions = perms || [];
        this.botPermissions = perms || [];
        this.options = {...options} || {
            aliases: [],
            cooldown: 0,
            description: "Not Provided",
            usage: "Not Provided",
            devOnly: false
        };
    }

    run(message) {
        message.sm("Command not ready!");
    }
};
