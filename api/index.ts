import dotenv from 'dotenv';
import  {App}  from'./app';
dotenv.config();
function main(){
    const app = new App();
    app.listen();
}

main();

/**
 * Some change
 */