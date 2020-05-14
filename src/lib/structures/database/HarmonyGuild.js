const Guild = require("../../../models/Guild");
const Member = require("../../../models/Member");

module.exports = class HarmonyGuild {
	constructor(id) {
		this.id = id;
		this._init(id);
		this._guild = false;
	}

	_init(id) {
		Guild.findOne({id}).then((guild) => {
			if (guild) return this._guild = guild;
			this._guild = new Guild({
				id,
				prefix: "!",
				staffRoles: [],
				logs: {
					kick: false,
					ban: false,
					clear: false,
					mute: false,
					messagedelete: false,
					vcjoin: false,
					all: false,
					channel: "none"
				},
				tags: [],
				case: 0
			});
			this._guild.save().catch(console.error);
		});
	};

	get logs() {
		return this._guild.logs;
	}

	get case() {
		return this._guild.case;
	}

	get prefix() {
		return this._guild.prefix;
	}
  set prefix(prefix) {
    return this._guild.prefix = prefix;
  }

	get tags() {
		return this._guild.tags;
	}

	findTag(identifier) {
		return this._guild.tags.find((tag) => tag.identifier.toLowerCase() === identifier.toLowerCase());
	}

	addTag(identifier, content) {
		this._guild.tags.push({identifier, content});
	}

	editTag(identifier, content) {
		this._guild.tags.find((tag) => tag.identifier = identifier).content = content;
	}

	deleteTag(identifier) {
		this._guild.tags.splice(this._guild.tags.findIndex((tag) => tag.identifier.toLowerCase() === identifier.toLowerCase()), 1);
	}

	increaseCase() {
		this._guild.case++;
	}

	log(name, value) {
		this._guild.logs[name] = value;
	}

	async members() {
		return Member.find({guildId: this.id});
	}

	save() {
		return this._guild.save().catch(console.error);
	}
};

