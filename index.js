const Commando = require("discord.js-commando");
const bot = new Commando.Client({ partials: ['MESSAGE', 'CHANNEL'] });
require('dotenv').config()

bot.on("message", (message) => {
	if(message.channel.name === "pinboard" && message.author.id != "585542675634192396"){
		message.delete(1000);
		message.author.send("You are not PinBot. You may not send messages in #pinboard.");
		message.author.send({embed: {
		    color: 3447003,
		    author: {
		      name: bot.user.username,
		      icon_url: bot.user.avatarURL
		    },
		    title: "This is an embed",
		    url: "http://google.com",
		    description: "This is a test embed to showcase what they look like and what they can do.",
		    fields: [{
		        name: "Fields",
		        value: "They can have different fields with small headlines."
		      },
		      {
		        name: "Masked links",
		        value: "You can put [masked links](http://google.com) inside of rich embeds."
		      },
		      {
		        name: "Markdown",
		        value: "You can put all the *usual* **__Markdown__** inside of them."
		      }
		    ],
		    timestamp: new Date(),
		    footer: {
		      icon_url: bot.user.avatarURL,
		      text: "© Example"
		    }
		  }
		});
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

        channel.send("*\"" + reaction.message.content + "\"* - <@" + reaction.message.author.id + ">\nhttps://ptb.discordapp.com/channels/" + reaction.message.guild.id + "/" + reaction.message.channel.id + "/" + reaction.message.id);
    }
});

bot.on("ready", () => {
    console.log("Ready");
});

bot.login(process.env.BOT_TOKEN);
