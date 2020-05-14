const {searchQuery, random} = require("./util/functions");
module.exports = {
    BobbieClient: require("./structures/BobbieClient"),
    searchQuery,
    random,
    Command: require("./structures/base/Command"),
    Event: require("./structures/base/Event"),
    BobbyEmbed: require("./structures/extend/BobbyEmbed")
};