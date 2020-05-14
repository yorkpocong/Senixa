const mongoose = require("mongoose");

const user = mongoose.Schema({
    id: String,
    dev: Boolean
});

const userModel = mongoose.model("user", user);
module.exports = userModel;