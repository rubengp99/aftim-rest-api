import  {connection} from'../dbs';
import * as querys from './query';

// start the db connection


/**
 * This function get all of the elements on the table
 * @param model  model of the table 
 * @param query paramaters to modify the consult
 * ```
 * query:{fields:'id', limit:50, offset:0, order:'asc', orderField:'id'}
 * ``` 
 */
export const get = async (model:string,query?:any):Promise<any> => {
    
    let sql = querys.selectSQL(query,model);
    try {
        let data = await connection.query(sql);
        return data[0];
    } catch (error) {
        if(error.code === 'ER_PARSE_ERROR' || error.code === 'ER_BAD_FIELD_ERROR'){ 
            console.log(error);
            throw new Error('BD_SYNTAX_ERROR');
        }
        throw new Error(`Error en conexion connection la BD, error: ${error}`);
    }
}

/**
 * This function return the object especified if exist
 * @param model model of the table
 * @param id id of the register in the table
 * @param query paramaters to modify the consult
 * ```
 * query:{fields:'id', limit:50, offset:0, order:'asc', orderField:'id'}
 * ```
 */
export const getOne = async (model:string,id:string | number ,query:any):Promise<any> =>{
    let sql = querys.selectSQLOne(id,query,model);
    try {
        let data:any = await connection.query(sql);
        return data[0][0];
    } catch (error) {
        if(error.code === 'ER_PARSE_ERROR' || error.code === 'ER_BAD_FIELD_ERROR'){ 
            console.log(error);
            throw new Error('BD_SYNTAX_ERROR');
        }
        throw new Error(`Error en conexion connection la BD, error: ${error}`);
    }
}

/**
 * This function return a collection of objects filtered by other
 * @param model model of the table
 * @param id id of register in the table
 * @param other model of the other entity
 * @param query parameters to modify the consult
 * ```
 * query:{fields:'id', limit:50, offset:0, order:'asc', orderField:'id'}
 * ```
 */
export const getOtherByMe = async (model:string,id:string | number ,other:string,query?:any):Promise<any> =>{
    let sql = querys.selectByFilter(query,other,model,id);
    try {
        let data = await connection.query(sql);
        return data[0];
    } catch (error) {
        if(error.code === 'ER_PARSE_ERROR' || error.code === 'ER_BAD_FIELD_ERROR'){ 
            console.log(error);
            throw new Error('BD_SYNTAX_ERROR');
        }
        throw new Error(`Error en conexion connection la BD, error: ${error}`);
    }
}

export const getPersonalized = async (sql:string):Promise<any> => {
    try {
        let data = await connection.query(sql);
        return data[0];
    } catch (error) {
        if(error.code === 'ER_PARSE_ERROR' || error.code === 'ER_BAD_FIELD_ERROR'){ 
            console.log(error);
            throw new Error('BD_SYNTAX_ERROR');
        }
        throw new Error(`Error en conexion connection la BD, error: ${error}`);
    }
}

/**
 * This function create a new register in the bd
 * @param model model of the table
 * @param object the new object to introduce in the db
 */
export const  create = async (model:string,object:any):Promise<any> =>{
    try {
        let inserted = await connection.query(`INSERT INTO ${model} set ?`,[object]);
        return inserted[0];
    } catch (error) {
        if(error.code === 'ER_PARSE_ERROR' || error.code === 'ER_BAD_FIELD_ERROR' || error.code === 'ER_NO_REFERENCED_ROW_2'){ 
            console.log(error);
            throw new Error('BD_SYNTAX_ERROR');
        }
        throw new Error(`Error en conexion connection la BD, error: ${error}`);
    }
}
/**
 * This function update a register in the bd
 * @param model model of the table
 * @param id id of the register in the table
 * @param object object to update in the db
 */
export const update = async (model:string,id:string | number,object:any):Promise<any> =>{
    try {
        let updated = await connection.query(`UPDATE ${model} set ? WHERE id = ?`,[object,id]);
        return updated;
    } catch (error) {
        if(error.code === 'ER_PARSE_ERROR' || error.code === 'ER_BAD_FIELD_ERROR' || error.code === 'ER_NO_REFERENCED_ROW_2'){ 
            console.log(error);
            throw new Error('BD_SYNTAX_ERROR');
        }
        throw new Error(`Error en conexion connection la BD, error: ${error}`);
    }
}

/**
 * This function delete a register from de bd
 * @param model model of the table
 * @param id id of the register
 */
export const remove = async (model:string,id:string | number):Promise<any> =>{
    try {
        let deleted = await connection.query(`DELETE FROM ${model} WHERE id = ? `,[id]);
        return deleted;
    } catch (error) {
        throw new Error(`Error en conexion connection la BD, error: ${error}`);
    } 
}

/**
 * This function return the total count of register in a table
 * @param model model of the table
 */
export const count = async (model:string):Promise<number> => {
    try {
        let count:any = await connection.query(`SELECT COUNT(id) as total FROM ${model}`);
        let total = count[0][0].total;
        return total;
    } catch (error) {
        throw new Error(`Error en conexion connection la BD, error: ${error}`);
    }
}
/**
 * This function return the count of all register related to other table
 * @param model the model of the table
 * @param other the other table
 * @param id the id of the register
 */
export const countOther = async (model:string,other:string,id:string | number):Promise<number> =>{
    try {
        let count:any = await connection.query(`SELECT COUNT(id) as total FROM ${other} WHERE ${model}_id = ${id}`);
        let total = count[0][0].total;
        return total;
    } catch (error) {
        throw new Error(`Error en conexion connection la BD, error: ${other}`);
    }
}

/**
 * Validate if one user exist
 * @param user login of the user
 */
export const getUser = async (user:string)=>{
    try {
        let data:any = await connection.query(`SELECT * FROM usuario WHERE login = ? or login = ?`,[user,user]);
        return data[0][0];
    } catch (error) {
        throw new Error(`Error en conexion connection la BD, error: ${error}`);
    }
}

/**
 * Get a company data
 * @param id id of the company
 */
export const empresa = async (id:string)=>{
    try {
        let empresa:any = await connection.query(`SELECT * FROM empresa WHERE id = ?`,[id]);
        return empresa[0];
    } catch (error) {
        throw new Error(`Error en conexion connection la BD, error: ${error}`);
    }
}


