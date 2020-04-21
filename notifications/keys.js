const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    twilio:{
        TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID,
        TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
    },
    telegram:{
        TELEGRAM_BOT_ID: process.env.TELEGRAM_BOT_ID
    }
}