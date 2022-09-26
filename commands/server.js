const { SlashCommandBuilder } = require('discord.js');

// module.exports is how you export data in Node.js so that you can require() in
// other files.
module.exports = {
	data: new SlashCommandBuilder()
		.setName('server')
		.setDescription('Replies with server info!'),
	async execute(interaction) {
		await interaction.reply(
			`Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`,
		);
	},
};
