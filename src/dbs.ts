import  {createPool} from 'mysql2/promise';
import {database} from './keys';

export async function connect(){
    try {
        const connection = await createPool(database);
        return connection;  
    } catch (error) {
        console.log(error);
    }
    
}