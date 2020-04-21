const {Telegram } = require('telegraf');

const client = new Telegram('704873922:AAFZ3iZnZq_D3oGSwclPbksrj83BHs093fQ');

client.sendMessage('947982989','Hola').then((msg) => console.log(msg)).catch((e)=> console.log(e))