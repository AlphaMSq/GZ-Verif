const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ChannelType, PermissionsBitField } = require('discord.js');
const { Modal, TextInputComponent, showModal } = require('discord-modals');
const Logger = require('../utils/Log');
const config = require('../config');

const createModal = (interaction, modalConfig, modalId, client) => {
    const modal = new Modal()
        .setCustomId(modalId)
        .setTitle(modalConfig.title);

    modalConfig.inputs.forEach(input => {
        const { customId, label, placeholder, style, required } = input;

        const textInputComponent = new TextInputComponent()
            .setCustomId(customId)
            .setLabel(label)
            .setPlaceholder(placeholder)
            .setStyle(style)
            .setRequired(required);

        modal.addComponents(textInputComponent);
    });

    try {
        showModal(modal, {
            client: client,
            interaction: interaction
        });
    } catch (error) {
        Logger.error(error);
    }
};

module.exports = {
    name: 'interactionCreate',
    async execute(interaction, client) {
        const { embeds, buttons } = config;
        if (interaction.customId == buttons.createRequest.label) {
            createModal(interaction, config.modals.mainModal, 'mainModal', client);
        }
    }
};