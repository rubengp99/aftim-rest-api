import  {createPool} from 'mysql2/promise';
import {database} from './keys';

export async function connect(){
    const connection = await createPool(database);
    return connection;
}