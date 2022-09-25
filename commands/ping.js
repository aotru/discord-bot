const { SlashCommandBuilder } = require('discord.js');

// module.exports is how you export data in Node.js so that you can require() in
// other files.
module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong'),
	async execute(interaction) {
		await interaction.reply('Pong!');
	},
};

// TODO: Delete commands
