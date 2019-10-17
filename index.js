const Commando = require("discord.js-commando");
const bot = new Commando.Client({ partials: ['MESSAGE', 'CHANNEL'] });
require('dotenv').config()

bot.on("message", (message) => {
	if(message.channel.name === "pinboard" && message.author.id != "585542675634192396"){
		message.delete(1000);
		message.author.send("You are not PinBot. You may not send messages in #pinboard.");
});

bot.on('messageReactionAdd', async (reaction, user) => {
	// When we receive a reaction we check if the message is partial or not
	if (reaction.message.partial) {
		// If the message was removed the fetching might result in an API error, which we need to handle
		try {
			await reaction.message.fetch();
		} catch (error) {
			console.log('Something went wrong when fetching the message: ', error);
		}
	}
	// Now the message has been cached and is fully available
    if (reaction.emoji.name === '📌') {
		var channel;
		try{
        	channel = reaction.message.guild.channels.find(channel => channel.name === "pinboard");
		}
		catch(e){
			user.send("Pinboard channel does not exist, so it is impossible to send this message. To solve this, request that a moderator create a text channel called \"pinboard\".");
			return;
		}

		if(!channel){
			user.send("Pinboard channel does not exist, so it is impossible to send this message. To solve this, request that a moderator create a text channel called \"pinboard\".");
			return;
		}

		channel.send({
			embed: {
				color: 9900000,
				author: {
					name: reaction.message.author.username,
					icon_url: reaction.message.author.avatarURL
				},
				title: reaction.message.content,
				description: "https://ptb.discordapp.com/channels/" + reaction.message.guild.id + "/" + reaction.message.channel.id + "/" + reaction.message.id,
				timestamp: reaction.message.createdAt
			}
		});
    }
});

bot.on("ready", () => {
    console.log("Ready");
});

bot.login(process.env.BOT_TOKEN);
