import {connect}  from '../dbs';
import  {Pool} from 'mysql2/promise';
var con:Pool;
connect().then(connection =>{
    con = connection;
})
.catch(e=>console.log(e));
export const getUser = async (user:string)=>{
    try {
        let data:any = await con.query(`SELECT * FROM usuario WHERE login = ?`,[user]);
        return data[0];
    } catch (error) {
        throw new Error(`Error en conexion con la BD, error: ${error}`);
    }
}
export const empresa = async (id:string)=>{
    try {
        let empresa:any = await con.query(`SELECT * FROM empresa WHERE id = ?`,[id]);
        return empresa[0];
    } catch (error) {
        throw new Error(`Error en conexion con la BD, error: ${error}`);
    }
}

export const insertUser = async (user:any)=>{
    try {
        let response = await con.query(`INSERT INTO usuario SET ?`,[user]);
        return response;
    } catch (error) {
        throw new Error(`Error en conexion con la BD, error: ${error}`);
    }
}