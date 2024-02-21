const config = require('./config.js');
const { Client, GatewayIntentBits } = require('discord.js');
const fs = require('fs');
const DB = require('qjson-db');
const discordModals = require('discord-modals');
const Logger = require('./utils/Log.js');

const client = new Client({ intents: [
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildIntegrations
]});
discordModals(client);

// Initializing databases
client.nicknamesDB = new DB('./data/nicknamesDB.json');
client.nicknamesDB.set("init", true);

const events = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
for (const file of events){
    const event = require(`./events/${file}`);
    client.on(event.name, (...args) => event.execute(...args, client));
}

const cmds = require("./cmds.js");
client.on('messageCreate', (msg) => {
    if (msg.author.username != client.user.username && msg.author.discriminator != client.user.discriminator) {
        const discordCmd = msg.content.trim() + " ";
        const discordCmdName = discordCmd.slice(0, discordCmd.indexOf(" "));
        for (i in cmds) {
            const cmdsListName = config.discord.prefix + cmds[i].name;
            if (discordCmdName == cmdsListName) {
                Logger.info(msg.author.username +" CMD " + discordCmd);
                cmds[i].out(client, msg);
            }
        }
    }
});

client.login(config.discord.token);