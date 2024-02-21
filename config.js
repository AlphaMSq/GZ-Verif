module.exports = {
    discord: {
        token: '',
        prefix: '!'
    },

    embeds: {
        embedCollor: "#8c03fc",

        // Цвет встроенных error сообщений бота
        embedErrorColor: "#ff0000",

        // URL для изображения во встроенных сообщениях
        thumbImage: "https://cdn.discordapp.com/attachments/1145785190153719850/1209841352079183912/PicsArt_02-20-12.51.01.png?ex=65e86390&is=65d5ee90&hm=3eab0e122b447bbc1d90d296ead3ff0b903ee4ff969d23aa4274c5adc15408d1&",

        // Текст в подвале встроенных сообщений
        footerText: "GZMC.lol | 25565 (19132)",

        // Встраивание, отправляемое в основной ютуб канал
        mainEmbed: {
            description: `**For verification, please click the "Verification" button. 🔰**
            - 📌*By submitting your nickname in the form, you agree that technical support will be provided through tickets based on the entered data.*
            - 🚀*You also agree to notify moderation/administration about any changes to your nickname.*`            
        },

        // Встраивание, отправляемое в ЛС
        welcomeEmbed: {
            title: "GlitchZone",
            description: "Hi, thank you for providing your nickname and verification. Enjoy playing on our server!"
        },
    },

    buttons: {
        // Кнопка для создания заявки на ютуб
        createRequest: {
            label: 'Verify\nYourself',
            emoji: '✅',
            style: 'Primary'
        },
    },

    modals: {
        mainModal: {
            title: 'Verification Form',

            inputs: [
                { customId: "nicknameInput", label: 'Your nickname:', placeholder: 'Write your real nickname here.', style: 'SHORT', required: true}
            ]
        }
    },

    channels: {
        // Канал для основных встроенных сообщений бота
        mainChannel: "1208456395222159423",
    },

    roles: {
        // Роль для участника
        PlayerRole: "1208456394756456553",
        // Роль для участника
        VerifiedRole: "1208456394785693732",

        // Роль модераторов
        moderatorRole: "1208456394785693734",
    },

    settings: {
        // ID вашего сервера Discord
        guildId: "1208456394739552266",
    },
};
