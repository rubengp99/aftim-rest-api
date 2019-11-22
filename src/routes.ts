import  {Application} from 'express';
import  grupo from './components/grupos/route';
import  subgrupos from './components/subgrupos/route';
import conceptos from './components/conceptos/route';
import marcas from './components/marcas/route';
import unidades from './components/unidades/route';
import depositos from './components/depositos/route';
import movDep from './components/movimiento_deposito/route';
import areasAtencion from './components/areas_atencion/route';
import banco from './components/banco/route';
import cambio from './components/cambio/route';

export const routes =  (app:Application) =>{
    app.use('/api/grupos',grupo);
    app.use('/api/subgrupos',subgrupos);
    app.use('/api/conceptos',conceptos);
    app.use('/api/marcas',marcas);
    app.use('/api/unidades',unidades);
    app.use('/api/depositos',depositos);
    app.use('/api/movimiento_deposito',movDep);
    app.use('/api/areas_atencion',areasAtencion);
    app.use('/api/banco',banco);
    app.use('/api/cambio',banco);
};