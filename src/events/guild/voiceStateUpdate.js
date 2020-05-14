const {Event} = require("../../lib");

module.exports = class VoiceStateUpdate extends Event {
	constructor() {
		super("someone joined a vc")
	}

	async run(bot, oldState, newState) {
		if (!oldState.channelID && newState.channelID) {
			bot.emit("logs", "vcJoin", {
				guild: newState.guild,
				channel: newState.member.voice.channel,
				member: newState.member
			})
		}
	}
};