const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, Colors } = require('discord.js');
const Logger = require('../utils/Log');
const config = require('../config');

module.exports = {
    name: 'ready',
    async execute(client){
        const clearOldMessages = async (channel) => {
            try {
                const messages = await channel.messages.fetch({ limit: 99 });
                await Promise.all(messages.map(async (message) => {
                    await message.delete().catch(() => {});
                }));
            } catch (error) {
                Logger.error("error while deleting old status messages:\n", error.message);
            }
        };
        const createEmbedWithButton = async (mainChannel, embedDescription, buttonConfig) => {
            await clearOldMessages(mainChannel);
        
            const embed = new EmbedBuilder()
                .setColor(config.embeds.embedCollor)
                .setDescription(embedDescription)
                .setFooter({
                    text: config.embeds.footerText
                })
                .setThumbnail(config.embeds.thumbImage);
        
            const row = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId(buttonConfig.label)
                        .setLabel(buttonConfig.label)
                        .setEmoji(buttonConfig.emoji)
                        .setStyle(ButtonStyle[buttonConfig.style])
                );
        
            try {
                mainChannel.send({
                    embeds: [embed],
                    components: [row]
                });
            } catch (error) {
                Logger.error(error);
            }
        };
        
        //createEmbedWithButton(client.channels.cache.get(config.channels.mainChannel), config.embeds.mainEmbed.description, config.buttons.createRequest);
        Logger.info(`Бот запущен!`);
    }
}