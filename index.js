const Commando = require("discord.js-commando");
const bot = new Commando.Client({
    partials: ['MESSAGE', 'CHANNEL']
});

require('dotenv').config();

bot.on("message", (message) => {
    if(message.channel.name === process.env.CHANNEL_NAME && message.author.id != process.env.BOT_ID) {
        message.delete(1000);
        message.author.send("You are not " + process.env.BOT_NAME + ". You may not send messages in " + process.env.CHANNEL_NAME + ".");
    }
});

bot.on('messageReactionAdd', async (reaction, user) => {
	console.log("reaction");
    if (reaction.message.partial) {
        try {
            await reaction.message.fetch();
        } catch (error) {
            console.log('Something went wrong when fetching the message: ', error);
        }
    }
    if ( reaction.emoji.name === process.env.REACT_EMOTE ) {
        let channel;
        try {
            channel = reaction.message.guild.channels.find( channel => channel.name === process.env.CHANNEL_NAME );
        }
        catch(e) {
            user.send( process.env.CHANNEL_NAME + " channel does not exist, so it is impossible to send this message. To solve this, request that a moderator create a text channel called " + process.env.CHANNEL_NAME + "." );
            return;
        }

        if(!channel) {
            user.send( process.env.CHANNEL_NAME + " channel does not exist, so it is impossible to send this message. To solve this, request that a moderator create a text channel called " + process.env.CHANNEL_NAME + "." );
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
                description: "https://ptb.discordapp.com/channels/" +
                    reaction.message.guild.id + "/" +
                    reaction.message.channel.id + "/" +
                    reaction.message.id,
                timestamp: reaction.message.createdAt
            }
        });
    }
});

bot.on("ready", () => {
    console.log("Ready");
});
bot.login(process.env.BOT_TOKEN);
