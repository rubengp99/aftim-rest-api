import  {Application} from 'express';
import  grupo from './components/grupos/route';
import  subgrupos from './components/subgrupos/route';
import conceptos from './components/conceptos/route';

export const routes =  (app:Application | any) =>{
    app.use('/api/grupos',grupo);
    app.use('/api/subgrupos',subgrupos);
    app.use('/api/conceptos',conceptos);
};