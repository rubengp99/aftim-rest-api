const nodemailer = require('nodemailer');
const { mail } = require('../../keys');
/**
 * Send a email to an especific user
 * @param {string} user 
 * @param {string} message
 * @returns {Promise<JSON>} response
 */
async function sendMail(message, email) {
    try {

        let transporter = nodemailer.createTransport({
            service: 'Gmail',
            port: 465,
            secure: false,
            auth: {
                user: mail.EMAIL_DATA.MAIL,
                pass: mail.EMAIL_DATA.PASSWORD
            }
        });

        let { messageId } = await transporter.sendMail({
            to: email,
            from: EMAIL_DATA.MAIL,
            subject: 'Password recuperation',
            html: message
        });
        if (!messageId) return { code: 500, message: 'error al enviar correo' };
        return { code: 200, message: 'Correo enviado' };
    } catch (error) {
        console.log(error);
        return { code: 500, message: 'error al enviar correo' };
    }
}

module.exports = {
    sendMail
}