const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    twilio:{
        TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID,
        TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
    },
    telegram:{
        TELEGRAM_BOT_ID: process.env.TELEGRAM_BOT_ID
    },
    web_push:{
        WEB_PUSH_PUBLIC_KEY: process.env.WEB_PUSH_PUBLIC_KEY,
        WEB_PUSH_PRIVATE_KEY: process.env.WEB_PUSH_PRIVATE_KEY
    },
    mail:{
        MAIL: process.env.MAIL_SUPPORT,
        PASSWORD: process.env.MAIL_PASSWORD
    },
    DATA_URL: process.env.DATA_URL
}