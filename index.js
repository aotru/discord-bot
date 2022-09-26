/* eslint-disable brace-style */
const {
	Client,
	GatewayIntentBits,
	ActivityType,
	Partials,
	ChannelType,
	Collection,
} = require('discord.js');
const { token, ulgut, clientId } = require('./config.json');
const fs = require('node:fs');
const path = require('node:path');

// Create a new client instance
// The Guilds intent option is necessary for client to work properly, as it
// ensures that the caches for guilds, channels, and roles are populated and
// available for internal use.
const client = new Client({
	partials: [Partials.Channel],
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.Guilds,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMessageReactions,
		GatewayIntentBits.DirectMessageTyping,
		GatewayIntentBits.DirectMessages,
		GatewayIntentBits.DirectMessageReactions,
	],
});

client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs
	.readdirSync(commandsPath)
	.filter((file) => file.endsWith('.js'));
for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	// Set a new item in the Collection
	// With the key as the command name and the value as the exported module
	client.commands.set(command.data.name, command);
}
// When the client is ready, run this code (only once)
client.once('ready', () => {
	console.log('Ready');
	client.user.setStatus('dnd');
	client.user.setActivity('bladee', {
		type: ActivityType.Listening,
	});
});

client.on('interactionCreate', async (interaction) => {
	if (!interaction.isChatInputCommand()) return;

	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({
			content: 'There was an error while executing this command!',
			ephemeral: true,
		});
	}
});

client.on('messageCreate', async (message) => {
	if (
		message.channel.type == ChannelType.DM &&
		message.author.id != clientId
	) {
		message.reply('Message slime#0281 instead of me.');
	} else {
		if (message.author.id == ulgut) {
			await message.react('🤡');
		}
		if (
			message.content.toLowerCase().includes('drain') &&
			message.author.id != clientId
		) {
			await message.reply('drain gang');
		}
	}
});
// Login to Discord with token
client.login(token);
