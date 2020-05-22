////ARCHIVO DE CONFIGURACION DEL SERVIDOR
//Requerimos los modulos necesarios para la app
import express, { Application } from 'express';
import path from 'path';
import { routes } from './routes';
import cors from 'cors';
import morgan from 'morgan';
import chalk from 'chalk';
import dotenv from 'dotenv';
import fs from "fs"
import https from "https"
dotenv.config();

/**
 * Class of the principal application of the server
 * ```
 * const app = new App();
 * const app = new App(3000);
 * ```
 * 
 */

export class App {
    public app: Application;
    
    /**
     * 
     * @param port the number of the port where the app is started to listen
     */
    constructor(private port?: number | string) {
        this.app = express();
        this.settings();
        this.middlewares();
        this.routes();
    }

    private settings() {
        this.app.set('port', this.port || process.argv[2] || process.env.API_PORT || 81);
    }

    private middlewares() {
        this.app.use(cors({ exposedHeaders: 'Authorization' }));
        this.app.use(morgan("dev"));
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use('/api/images/',express.static(path.resolve('public/images')));
    }

    private routes() {
        routes(this.app);
    }

    /**
     * Function to start the server
     */
    public listen() {
        try {
            let privateKey = fs.readFileSync( process.env.SSL_KEY+"" );
            let certificate = fs.readFileSync( process.env.SSL_CERT+"" );
            https.createServer({
                key: privateKey,
                cert: certificate
            },this. app).listen(this.app.get('port'));
        } catch (e) {
            this.app.listen(this.app.get('port'));
        }
        
        console.log(`${chalk.yellow('[SERVER]')} running on port ${this.app.get('port')}`);
    }
}
