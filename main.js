const djs = require('discord.js');
const client = new djs.Client({
    intents: [djs.GatewayIntentBits.Guilds, djs.GatewayIntentBits.GuildInvites],
    Partials: [djs.Partials.Guild]
});
const fs = require('fs');
require('dotenv').config();

client.on('ready', () => {
    console.log('Bot is ready');
    client.guilds.cache.forEach(async (guild) => {
        const invite = await guild.channels.cache.find(channel => channel.type === djs.ChannelType.GuildText).createInvite({
            maxAge: 0,
            maxUses: 0
        });
        console.log(`Invite for ${guild.name} is ${invite.url}`);
        const date = new Date();
        const clientId = client.user.id;
        const clientName = client.user.username;
        fs.appendFile(`guilds_${clientId}_${clientName}.txt`, `${guild.name} - ${invite.url}\n`, (err) => {
            if (err) {
                console.error(err);
            }
        });
    });
});

client.login(process.env.TOKEN);