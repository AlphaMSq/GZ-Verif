const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, PermissionsBitField, ChannelType } = require('discord.js');
const config = require('../config');
const Logger = require('../utils/Log');
const { Modal } = require('discord-modals');

/**
 * Обработчик выполнения модального окна
 * @param {Modal} modal - Объект модального окна
 * @param {Client} client - Объект Discord клиента
 */
module.exports = {
    name: 'modalSubmit',
    async execute(modal, client) {
        const modalIds = [ "mainModal" ];

        if(modalIds.includes(modal.customId)) {
            const modalConfig = config.modals[modal.customId];

            const fields = [];
            for(const input of modalConfig.inputs) {
                fields.push({ name: input.label, value: modal.getTextInputValue(input.customId)});
            }

            const guild = client.guilds.cache.get(modal.guildId);
            await guild.members.fetch();
            const member = guild.members.cache.get(modal.user.id);

            if (!member) {
                Logger.error('Member not found');
                return;
            }

            client.nicknamesDB.set(modal.user.id, fields[0].value);

            try {
                await member.setNickname(fields[0].value);
            } catch (error) {
                Logger.error("Ошибка установки ника:",error);
            }

            // Добавить роль
            try {
                await member.roles.add(config.roles.PlayerRole);
                await member.roles.add(config.roles.VerifiedRole);
            } catch (error) {
                Logger.error('Error updating roles:', error);
            }

            try {
                const dmChannel = await member.createDM();
                
                const embed = new EmbedBuilder()
                    .setColor(config.embeds.embedCollor)
                    .setAuthor({ name: config.embeds.welcomeEmbed.title })
                    .setDescription(config.embeds.welcomeEmbed.description)
                    .setThumbnail(config.embeds.thumbImage)
                    .setFooter({ text: config.embeds.footerText });
                
                await dmChannel.send({ embeds: [embed] });
            } catch (error) {
                Logger.error(error);
            }

            modal.reply({
                content: `You've been verified!`,
                ephemeral: true
            });
        }
    }
};