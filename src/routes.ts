import  {Application} from 'express';
import  grupo from './components/grupos/route';
import  subgrupos from './components/subgrupos/route';

export const routes =  (app:Application | any) =>{
    app.use('/api/grupos',grupo);
    app.use('/api/subgrupos',subgrupos);
};