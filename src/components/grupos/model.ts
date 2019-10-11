import  {connect} from'../../dbs';
import * as querys from '../../helpers/query';
const model = "grupos";

export const get = async (query:any) => {
    const con = await connect();
    let sql = querys.selectSQL(query,model);
    try {
        let data = await con.query(sql);
        return data[0];
    } catch (error) {
        throw new Error(`Error en conexion con la BD, error: ${error}`);
    }
}
export const getOne = async (id:string | number ,query:any) =>{
    const con = await connect();
    let sql = querys.selectSQLOne(id,query,model);
    try {
        let data = await con.query(sql);
        return data;
    } catch (error) {
        throw new Error(`Error en conexion con la BD, error: ${error}`);
    }
}
export const getOtherByMe = async (id:string | number ,query:any,other:string) =>{
    const con = await connect();
    let sql = querys.selectByFilter(query,other,model,id);
    try {
        let data = await con.query(sql);
        return data;
    } catch (error) {
        throw new Error(`Error en conexion con la BD, error: ${error}`);
    }
}

export const  create = async (object:any) =>{
    const con = await connect();
    try {
        let inserted = await con.query(`INSERT INTO ${model} set ?`,[object]);
        return inserted;
    } catch (error) {
        throw new Error(`Error en conexion con la BD, error: ${error}`);
    }
}
export const update = async (id:string | number,object:any) =>{
    const con = await connect();
    try {
        let updated = await con.query(`UPDATE ${model} set ? WHERE id = ?`,[object,id]);
        return updated;
    } catch (error) {
        throw new Error(`Error en conexion con la BD, error: ${error}`);
    }
}

export const remove = async (id:string | number) =>{
    const con = await connect();
    try {
        let deleted = await con.query(`DELETE FROM ${model} WHERE id = ? `,[id]);
        return deleted;
    } catch (error) {
        throw new Error(`Error en conexion con la BD, error: ${error}`);
    } 
}
export const count = async ():Promise<number> => {
    const con = await connect();
    try {
        let count:any = await con.query(`SELECT COUNT(id) as total FROM ${model}`);
        let total = count[0][0].total;
        return total;
    } catch (error) {
        throw new Error(`Error en conexion con la BD, error: ${error}`);
    }
}
export const countOther = async (other:string,id:string | number) =>{
    const con = await connect();
    try {
        let count:any = await con.query(`SELECT COUNT(*) FROM ${other} WHERE ${model}_id = ${id}`);
        let total = count[0]['COUNT(*)'];
        return total;
    } catch (error) {
        throw new Error(`Error en conexion con la BD, error: ${other}`);
    }
}
