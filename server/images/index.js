const app = require('./app');

function main(){
    app.listen(app.get('port'));
    console.log(`[SERVER] Running on port ${app.get('port')}`);
}

main();