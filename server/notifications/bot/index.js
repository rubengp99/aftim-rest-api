const Telegraf = require('telegraf');
const axios = require('axios');
const { telegram } = require('../keys');
const bot = new Telegraf(telegram.TELEGRAM_BOT_ID);

bot.start((ctx) => {
    console.log(ctx.chat)
    ctx.reply('Welcome');
});

bot.hears('password', (ctx) => {
    console.log(ctx.message);
    ctx.reply('logged');
})

bot.command('login', async (ctx) => {
    try {
        let text = ctx.message.text.split(' ');
        let user = text[2];
        let password = text[4];
        let { data } = await axios.post('http://localhost:82/auth/login/', {
            data: {
                user,
                password
            }
        });
        if (!data) ctx.reply('Invalid')

        await bot.telegram.deleteMessage(ctx.chat.id, ctx.message.message_id);
        ctx.reply(`Welcome ${data.data.login}!!`);
    } catch (error) {
        console.log(error);
        ctx.reply('Error');
    }
});

bot.command('orders', async (ctx) => {
    try {
        let { id } = ctx.chat;

        let userRes = await axios.get(`http://localhost:82/data/usuario/?chat_id=${id}`);
        if (!userRes.data[0]) ctx.reply('You are not logged');

        let pedidos = `Pedidos del usuario ${userRes.data[0].login} \n\n`;

        let { data } = await axios.get(`http://localhost:82/data/usuario/${userRes.data[0].id}/pedidos`);
        data.forEach(element => {
            pedidos += `Pedido nro ${element.id} estado (${element.estado}) \n`;
        });

        ctx.reply(pedidos);

    } catch (error) {
        console.log(error);
        ctx.reply('Error');
    }
});


module.exports = bot;