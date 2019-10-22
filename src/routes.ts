import  {Application} from 'express';
import  grupo from './components/grupos/route';
import  subgrupos from './components/subgrupos/route';
import conceptos from './components/conceptos/route';
import marcas from './components/marcas/route';
import unidades from './components/unidades/route';

export const routes =  (app:Application) =>{
    app.use('/api/grupos',grupo);
    app.use('/api/subgrupos',subgrupos);
    app.use('/api/conceptos',conceptos);
    app.use('/api/marcas',marcas);
    app.use('/api/unidades',unidades);
};