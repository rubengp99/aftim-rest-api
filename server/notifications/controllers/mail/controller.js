const nodemailer = require('nodemailer');
const { mail } = require('../../keys');
/**
 * Send a email to an especific user
 * @param {string} user 
 * @param {string} message
 * @returns {Promise<JSON>} response
 */
async function sendMail(data) {
    try {

        let transporter = nodemailer.createTransport({
            service: 'Gmail',
            port: 465,
            secure: false,
            logger: true,
            debug: true,
            ignoreTLS: true,
            auth: {
                user: mail.MAIL,
                pass: mail.PASSWORD
            }
        });

        let { messageId } = await transporter.sendMail({
            to: data.email,
            from: mail.MAIL,
            subject: data.subject,
            html: data.message
        });
        if (!messageId) return { code: 500, message: 'Error al enviar correo' };
        return { code: 200, message: 'Correo enviado' };
    } catch (error) {
        return { code: 500, message: 'Error al enviar correo' };
    }
}

module.exports = {
    sendMail
}