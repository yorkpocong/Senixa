const Member = require("../../../models/Member");
const HarmonyUser = require("./HarmonyUser");

module.exports = class HarmonyMember {
    constructor(id, guildId) {
        this.id = id;
        this._init(id, guildId);
        this._member = false;
        this.u = false;
    }

    _init(id, guildId) {
        Member.findOne({id, guildId}).then((member) => {
            if (member) return this._member = member;
            this._member = new Member({
                id,
                guildId,
                xp: 0,
                level: 1,
                muteTime: 0,
                warns: []
            });
            this._member.save().catch(console.error);
        });
    };

    add(locale, amount) {
        if (!this._member) return;
        this._member[locale] += amount;
    }

    remove(locale, amount) {
        this._member[locale] += amount;
    }

    set(locale, amount) {
        this._member[locale] = amount;
    }

    save() {
        this._member.save().catch(console.error);
    }

    get user() {
        if (this.u) return this.u;
        this.u = new HarmonyUser(this.id);
        return this.u;
    }

    get xp() {
        return this._member.xp;
    }

    get level() {
        return this._member.level;
    }

    get dev() {
        return this._member.dev;
    }

    get muteTime() {
        return this._member.muteTime;
    }
};