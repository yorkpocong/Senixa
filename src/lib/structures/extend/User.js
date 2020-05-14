const {Structures} = require("discord.js");
const HarmonyUser = require("../database/HarmonyUser");

module.exports = () => Structures.extend("User", User =>
    class DBUser extends User {
        constructor() {
            super(...arguments);
            this.database = false;
        }

        get db() {
            if (this.database) return this.database;
            this.database = new HarmonyUser(this.id);
            return this.database;
        }
    }
);