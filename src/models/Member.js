const mongoose = require("mongoose");

const member = mongoose.Schema({
    id: String,
    guildId: String,
    xp: Number,
    level: Number,
    muteTime: Number,
    warns: Array
});

module.exports = mongoose.model("Member", member);