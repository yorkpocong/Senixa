const User = require("../../../models/User");

module.exports = class HarmonyUser {
    constructor(id) {
        this._init(id);
        this._user = false;
    }

    _init(id, guildId) {
        User.findOne({id}).then((user) => {
            if (user) return this._user = user;
            this._user = new User({
                id,
                guildId,
                xp: 0,
                level: 1,
                muteTime: 0,
                dev: false
            });
            this._user.save().catch(console.error);
        });
    };
    get dev() {
        return this._user.dev;
    }
};