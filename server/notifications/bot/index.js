const Telegraf = require('telegraf');
const axios = require('axios');
const { telegram } = require('../keys');
const bot = new Telegraf(telegram.TELEGRAM_BOT_ID);

bot.start((ctx) =>{ 
    console.log(ctx.chat)
    ctx.reply('Welcome');
});

bot.hears('password', (ctx)=>{
    console.log(ctx.message);
    ctx.reply('logged');
})

bot.command('login', async (ctx)=> {
    try {
        let text = ctx.message.text.split(' ');
        let user = text[2];
        let password = text[4];
        let { data } = await axios.post('http://localhost:82/auth/login/',{
            data:{
                user,
                password
            }
        });
        if(!data) ctx.reply('Invalid')
        
        await bot.telegram.deleteMessage(ctx.chat.id,ctx.message.message_id);
        ctx.reply(`Welcome ${data.data.login}!!`);
    } catch (error) {
        console.log(error);
        ctx.reply('Error');
    }
})


module.exports = bot;