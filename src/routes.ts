import  {Application} from 'express';
import  grupo from './components/grupos/route';

export const routes =  (app:Application | any) =>{
    app.use('/api/grupos',grupo);
};