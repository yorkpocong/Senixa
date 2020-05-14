const mongoose = require("mongoose");

const guild = mongoose.Schema({
	id: String,
	staffRoles: Array,
  prefix: String,
	logs: {
		kick: Boolean,
		ban: Boolean,
		clear: Boolean,
		mute: Boolean,
		messagedelete: Boolean,
		vcjoin: Boolean,
		all: Boolean,
		all: Boolean,
		channel: String
	},
	tags: [{
		identifier: String,
		content: {
			title: String,
			description: String
		}
	}
	],
	case: Number
});
const guildModel = mongoose.model("guild", guild);
module.exports = guildModel;