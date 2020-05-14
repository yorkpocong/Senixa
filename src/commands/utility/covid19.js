const {Command} = require("../../lib");
const { NovelCovid } = require("novelcovid");
const track = new NovelCovid();


module.exports = class Covid19 extends Command {
    constructor() {
        super("covid", {
            description: "covid 19 stats",
            example: "!covid all or !covid usa",
            usage: "covid all or covid <county>",
            aliases: ["covid"],
            cooldown: 5000
        });
    }

    async run(message, args) {
        if (!args[0])
        return message.sm(`:no_entry: Provide a country name, For more information do ${message.guild.db.prefix || "!"}help covid`, {type: "error"});


      let corona = await track.countries(args.join(" ")) //change it to countries
      
      let embeded = message.embed()
      .setTitle(`:map: ${corona.country} :map: `)
      .addField("Total Cases", corona.cases, true)
      .addField("Total Deaths", corona.deaths, true)
      .addField("Total Recovered", corona.recovered, true)
      .addField("Today's Cases", corona.todayCases, true)
      .addField("Today's Deaths", corona.todayDeaths, true)
      .addField("Active Cases", corona.active, true)
      .setFooter("#StayHome | Senixa.gg ");
      return message.channel.send(embeded)
      
      
    }          
          };
     
          
