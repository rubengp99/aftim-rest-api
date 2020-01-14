import  {createPool} from 'mysql2/promise';
import {database} from './keys';
import { Pool } from 'mysql2/promise';

export var connection:Pool;
export function connect(){
    try {
        connection = createPool(database);
        if(connection)  console.log(`[DATABASE] connected`);
    } catch (error) {
        console.log(error);
    }
}