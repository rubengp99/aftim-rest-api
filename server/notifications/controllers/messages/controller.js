const { Telegram } = require('telegraf');
const axios = require('axios');
const { DATA_URL, telegram } = require('../../keys');

const client = new Telegram(telegram.TELEGRAM_BOT_ID);



async function sendMessageToUser(id, message) {
    try {
        const { data } = await axios.get(`${DATA_URL}/mysql/usuario/${id}`);
        if (!data) return { code: 404, message: 'The user doesnt exist' }
        if (!data.chat_id) return { code: 404, message: 'The user doesnt have a chat' }

        await client.sendMessage(data.chat_id, message);
        return { code: 200, message: 'Message sent' };
    } catch (error) {
        console.log(error);
        return { code: 500, message: 'error al enviar mensaje' };
    }
}

module.exports = { sendMessageToUser }