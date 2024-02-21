const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const config = require('./config');

module.exports = [
    {
        name: "profile",
        out: async (client, msg) => {
            if (!msg.member.permissions.has(PermissionsBitField.Flags.Administrator) || msg.member.roles.cache.has(config.roles.moderatorRole)) {
                return msg.channel.send("You are not authorized to use this command.");
            }

            if (msg.mentions.users.size > 0) {
                const mentionedUser = msg.mentions.users.first();
                const nickname = client.nicknamesDB.get(mentionedUser.id) || "No Nickname";

                const profileEmbed = new EmbedBuilder()
                    .setTitle("User Profile:")
                    .setColor("#3498db")
                    .setThumbnail(mentionedUser.displayAvatarURL())
                    .addFields([
                        { name: "Discord ID:", value: `\`${mentionedUser.id}\`` },
                        { name: "Discord Nickname:", value: `\`${mentionedUser.username}\`` },
                        { name: "Gamer Tag:", value: `\`${nickname}\`` }
                    ])

                msg.channel.send({
                    embeds: [ profileEmbed ]
                });
            } else {
                msg.channel.send({
                    content: `Mention a member to view their profile!`,
                    ephemeral: true
                });
            }
        }
    }
];
