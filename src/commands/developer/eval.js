const {Command} = require("../../lib");

module.exports = class Eval extends Command {
    constructor() {
        super("eval", {
            devOnly: true,
            description: "Evaluates your code",
            example: "!tag console.log('hi');",
            cooldown: 0
        });
    }

    async run(message, code) {
        let embed;
        try {
            let resulted = await eval(code.join(" "));
            const ctype = typeof resulted;
            if (ctype !== "string")
                resulted = require("util").inspect(resulted, {depth: 0})
            embed = message.embed()
                .setTitle("Evaluation")
                .addField("Input", `\`\`\`js\n${code}\`\`\``)
                .addField("Output", `\`\`\`js\n${resulted}\`\`\``)
                .addField("Type", `\`\`\`js\n${ctype}\`\`\``);
        } catch (e) {
            embed = message.embed()
                .setTitle("Error")
                .setColor("#ff0000")
                .addField("Input", `\`\`\`js\n${code}\`\`\``)
                .addField("Error", `\`\`\`js\n${e.name}: ${e.message}\`\`\``);
        }
        message.channel.send(embed);
    };
}