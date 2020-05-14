const {Command} = require("../../lib");
const got = require('got');

module.exports = class Shorten extends Command {
    constructor() {
        super("shorten", {
            description: "shorten a url",
            usage: "shorten <url>",
            aliases: ["shorten"],
            cooldown: 5000
        });
    }

    async run(message, args) {
        if (args[1]) {
            message.sm('Please provide a url to shorten!', {type: "Error"});
        }
    
        const url = args.join(' ');
    
        
    
        const res = await got(`http://tinyurl.com/api-create.php?url=${encodeURIComponent(url)}`);
        message.sm(res.body)

      
    }          
          };
     
          
