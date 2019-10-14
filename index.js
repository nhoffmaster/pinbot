const Commando = require("discord.js-commando");
const bot = new Commando.Client({ partials: ['MESSAGE', 'CHANNEL'] });
require('dotenv').config()

bot.on("message", (message) => {
	if(message.channel.id === "531575636532396043" && message.author.id != "585542675634192396"){
		message.delete(1000);
		message.author.send("You are not PinBot. You may not send messages in #pinboard.")
	}
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
        var channel = bot.channels.get("531575636532396043");
        channel.send("*\"" + reaction.message.content + "\"* - <@" + user.id + ">\nhttps://ptb.discordapp.com/channels/493512866452996146/" + reaction.message.channel.id + "/" + reaction.message.id);
    }
});

bot.on("ready", () => {
    console.log("Ready");
});

bot.login(process.env.BOT_TOKEN);
