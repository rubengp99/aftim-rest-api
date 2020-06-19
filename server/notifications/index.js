const chalk = require('chalk');
const app = require('./app');
const bot = require('./bot/index');
function main(){
    app.listen(app.get('port'),()=>{
        console.log(`${chalk.yellow('[SERVER]')} running on port ${app.get('port')}`);
        bot.launch();
    });
}

main();