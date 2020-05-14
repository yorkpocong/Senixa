const express = require("express");
const http = require("http");
const app = express();
const {BobbieClient} = require("./lib");
["GuildMember", "Guild", "User", "Message"].forEach((x) => require("./lib/structures/extend/" + x)());
const mongoose = require("mongoose");
const config = require("./config");


mongoose.connect("", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const bot = new BobbieClient(config.token);

bot.loadCommands(__dirname + "/commands");
bot.loadEvents(__dirname + "/events");
bot.config = config;
 // refresh yea


app.get("/", (request, response) => {
	console.log(Date.now() + " Ping Received");
	response.sendStatus(200);
});
app.listen(3000);
setInterval(() => {
	http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);
