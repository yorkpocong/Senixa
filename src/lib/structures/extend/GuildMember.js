const { Structures } = require("discord.js");
const HarmonyMember = require("../database/HarmonyMember");

module.exports = () =>
  Structures.extend(
    "GuildMember",
    Member =>
      class DBMember extends Member {
        constructor() {
          super(...arguments);
          this.database = new HarmonyMember(this.id, this.guild.id);
        }

        get db() {
          if (!this.database)
            this.database = new HarmonyMember(this.id, this.guild.id);
          return this.database;
        }
      }
  );
