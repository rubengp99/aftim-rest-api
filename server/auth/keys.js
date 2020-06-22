const dotenv = require("dotenv");
dotenv.config();
module.exports = {
    AUTH_URL: process.env.AUTH_URL,
    DATA_URL: process.env.DATA_URL,
    NOTS_URL: process.env.NOTS_URL,
    TOKEN_KEY: process.env.TOKEN_KEY,
    EMAIL_DATA: {
        MAIL: process.env.MAIL_SUPPORT,
        PASSWORD: process.env.MAIL_PASSWORD
    }
}