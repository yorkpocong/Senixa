const { Structures } = require("discord.js");
const HarmonyGuild = require("../database/HarmonyGuild");
const { searchQuery } = require("../../util/functions");

module.exports = () =>
  Structures.extend(
    "Guild",
    Guild =>
      class DBGuild extends Guild {
        constructor() {
          super(...arguments);
          this.database = new HarmonyGuild(this.id);
        }

        get db() {
          if (!this.database) this.database = new HarmonyGuild(this.id);
          return this.database;
        }

        async findMember(message, query) {
          let target = message.mentions.members.first();
          if (
            !target &&
            message.mentions.users.first() &&
            !message.mentions.members.first()
          )
            target = await this.fetchMember(message.mentions.users.first());

          if (!target)
            target =
              this.members.cache.find(
                mem =>
                  searchQuery(query, mem.user.username) ||
                  searchQuery(query, mem.displayName)
              ) || this.members.get(query);
          return target;
        }
      }
  );
