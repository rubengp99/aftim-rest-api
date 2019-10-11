import {connect}  from '../dbs';


export const getUser = async (user:string)=>{
    const con = await connect();
    try {
        let data:any = await con.query(`SELECT * FROM usuario WHERE login = ?`,[user]);
        return data[0];
    } catch (error) {
        throw new Error(`Error en conexion con la BD, error: ${error}`);
    }
}
export const empresa = async (id:string)=>{
    const con = await connect();
    try {
        let empresa:any = await con.query(`SELECT * FROM empresa WHERE id = ?`,[id]);
        return empresa[0];
    } catch (error) {
        throw new Error(`Error en conexion con la BD, error: ${error}`);
    }
}

export const insertUser = async (user:any)=>{
    const con = await connect();
    try {
        let response = await con.query(`INSERT INTO usuario SET ?`,[user]);
        return response;
    } catch (error) {
        throw new Error(`Error en conexion con la BD, error: ${error}`);
    }
}