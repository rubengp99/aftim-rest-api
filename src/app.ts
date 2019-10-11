////ARCHIVO DE CONFIGURACION DEL SERVIDOR
//Requerimos los modulos necesarios para la app
import express, {Application} from 'express';
import multer  from 'multer';
import path  from 'path'; 
import {routes} from './routes';
import cors  from 'cors';

export class App {
    private app:Application;
    private storage:multer.StorageEngine | undefined;

    constructor(private port?: number | string){
        this.app = express();
        this.settings();
        this.middlewares();
        this.routes();
    }

    private settings(){
        this.app.set('port',this.port || process.env.PORT || 80);
        this.storage = multer.diskStorage({//manejador de archivos como imagenes
            destination: path.resolve('public/images'),
            filename: (req,file,cb)=>{
                cb(null,new Date().getTime()+path.extname(file.originalname));
            }
        });
    }

    private middlewares(){
        this.app.use(cors());
        this.app.use(express.static(path.resolve('public')));//carpeta de archivos publicos
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended:false}));
        this.app.use(multer({storage:this.storage}).single('image')); 
    }

    private routes(){
        routes(this.app);
    }

    public async listen(){
        await this.app.listen(this.app.get('port'));
        console.log(`[SERVER] running on port ${this.app.get('port')}`);
    }
}


