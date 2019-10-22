import  {connect} from'../dbs';
import * as querys from './query';

export const get = async (model:string,query:any):Promise<any> => {
    const con = await connect();
    let sql = querys.selectSQL(query,model);
    try {
        let data = await con.query(sql);
        return data[0];
    } catch (error) {
        throw new Error(`Error en conexion con la BD, error: ${error}`);
    }
}
export const getOne = async (model:string,id:string | number ,query:any):Promise<any> =>{
    const con = await connect();
    let sql = querys.selectSQLOne(id,query,model);

    try {
        let data = await con.query(sql);
        return data[0];
    } catch (error) {
        throw new Error(`Error en conexion con la BD, error: ${error}`);
    }
}
export const getOtherByMe = async (model:string,id:string | number ,query:any,other:string):Promise<any> =>{
    const con = await connect();
    let sql = querys.selectByFilter(query,other,model,id);
    try {
        let data = await con.query(sql);
        return data[0];
    } catch (error) {
        throw new Error(`Error en conexion con la BD, error: ${error}`);
    }
}

export const  create = async (model:string,object:any):Promise<any> =>{
    const con = await connect();
    try {
        let inserted = await con.query(`INSERT INTO ${model} set ?`,[object]);
        return inserted;
    } catch (error) {
        throw new Error(`Error en conexion con la BD, error: ${error}`);
    }
}
export const update = async (model:string,id:string | number,object:any):Promise<any> =>{
    const con = await connect();
    try {
        let updated = await con.query(`UPDATE ${model} set ? WHERE id = ?`,[object,id]);
        return updated;
    } catch (error) {
        throw new Error(`Error en conexion con la BD, error: ${error}`);
    }
}

export const remove = async (model:string,id:string | number):Promise<any> =>{
    const con = await connect();
    try {
        let deleted = await con.query(`DELETE FROM ${model} WHERE id = ? `,[id]);
        return deleted;
    } catch (error) {
        throw new Error(`Error en conexion con la BD, error: ${error}`);
    } 
}
export const count = async (model:string):Promise<number> => {
    const con = await connect();
    try {
        let count:any = await con.query(`SELECT COUNT(id) as total FROM ${model}`);
        let total = count[0][0].total;
        return total;
    } catch (error) {
        throw new Error(`Error en conexion con la BD, error: ${error}`);
    }
}
export const countOther = async (model:string,other:string,id:string | number):Promise<number> =>{
    const con = await connect();
    try {
        let count:any = await con.query(`SELECT COUNT(id) as total FROM ${other} WHERE ${model}_id = ${id}`);
        let total = count[0][0].total;
        return total;
    } catch (error) {
        throw new Error(`Error en conexion con la BD, error: ${other}`);
    }
}