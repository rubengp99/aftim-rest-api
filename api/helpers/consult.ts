import axios, { AxiosRequestConfig } from 'axios';
import { dataURL } from '../keys';
// start the db connection


/**
 * This function get all of the elements on the table
 * @param model  model of the table 
 * @param query paramaters to modify the consult
 * ```
 * query:{fields:'id', limit:50, offset:0, order:'asc', orderField:'id'}
 * ``` 
 */
export const get = async (model: string, query?: any): Promise<any> => {
    try {
        let { data } = await axios.get(`${dataURL}/${model}`, { params: query });
        return data;
    } catch (error) {
        if(error.response.status ==='400') throw new Error('BD_SYNTAX_ERROR');
        throw new Error(`Error en conexion connection la BD, error: ${error.response.status}`);
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
export const getOne = async (model: string, id: string | number, query: any): Promise<any> => {
    try {
        let { data } = await axios.get(`${dataURL}/${model}/${id}`, { params: query });
        return data;
    } catch (error) {
        if(error.response.status ==='400') throw new Error('BD_SYNTAX_ERROR');
        throw new Error(`Error en conexion connection la BD, error: ${error.response.status}`);
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
export const getOtherByMe = async (model: string, id: string | number, other: string, query?: any): Promise<any> => {
    try {
        let { data } = await axios.get(`${dataURL}/${model}/${id}/${other}`, { params: query });
        return data;
    } catch (error) {
        if(error.response.status ==='400') throw new Error('BD_SYNTAX_ERROR');
        throw new Error(`Error en conexion connection la BD, error: ${error.response.status}`);
    }
}

export const getPersonalized = async (sql: string): Promise<any> => {
    try {
        let { data } = await axios.post(`${dataURL}/query`, { sql: sql  });
        return data;
    } catch (error) {
        if(error.response.status ==='400') throw new Error('BD_SYNTAX_ERROR');
        throw new Error(`Error en conexion connection la BD, error: ${error.response.status}`);
    }
}

/**
 * This function create a new register in the bd
 * @param model model of the table
 * @param object the new object to introduce in the db
 */
export const create = async (model: string, object: any): Promise<any> => {
    try {
        let { data } = await axios.post(`${dataURL}/${model}/`, {  data: object });
        return data;
    } catch (error) {
        if(error.response.status ==='400') throw new Error('BD_SYNTAX_ERROR');
        throw new Error(`Error en conexion connection la BD, error: ${error.response.status}`);
    }
}

/**
 * This function create a bunch of new registers in the bd
 * @param model model of the table
 * @param object the new object to introduce in the db
 */
export const insertMany = async (model: string, object: any): Promise<any> => {
    try {
        let { data } = await axios.post(`${dataURL}/${model}/many`, {  data: object });
        return data;
    } catch (error) {
        if(error.response.status ==='400') throw new Error('BD_SYNTAX_ERROR');
        throw new Error(`Error en conexion connection la BD, error: ${error.response.status}`);
    }
}
/**
 * This function update a register in the bd
 * @param model model of the table
 * @param id id of the register in the table
 * @param object object to update in the db
 */
export const update = async (model: string, id: string | number, object: any): Promise<any> => {
    try {

        let { data } = await axios.post(`${dataURL}/${model}/${id}`, { data: object } );
        return data;
    } catch (error) {
        if(error.response.status ==='400') throw new Error('BD_SYNTAX_ERROR');
        throw new Error(`Error en conexion connection la BD, error: ${error.response.status}`);
    }
}

/**
 * This function delete a register from de bd
 * @param model model of the table
 * @param id id of the register
 */
export const remove = async (model: string, id: string | number): Promise<any> => {
    try {
        let { data } = await axios.delete(`${dataURL}/${model}/${id}`);
        return data;
    } catch (error) {
        if(error.response.status ==='400') throw new Error('BD_SYNTAX_ERROR');
        throw new Error(`Error en conexion connection la BD, error: ${error.response.status}`);
    }
}

/**
 * This function return the total count of register in a table
 * @param model model of the table
 */
export const count = async (model: string): Promise<number> => {
    try {
        let { data } = await axios.get(`${dataURL}/count/${model}`);
        return data;
    } catch (error) {
        if(error.response.status ==='400') throw new Error('BD_SYNTAX_ERROR');
        throw new Error(`Error en conexion connection la BD, error: ${error.response.status}`);
    }
}
/**
 * This function return the count of all register related to other table
 * @param model the model of the table
 * @param other the other table
 * @param id the id of the register
 */
export const countOther = async (model: string, other: string, id: string | number): Promise<number> => {
    try {
        let { data } = await axios.get(`${dataURL}/count/${model}/${id}/${other}`);
        return data;
    } catch (error) {
        if(error.response.status ==='400') throw new Error('BD_SYNTAX_ERROR');
        throw new Error(`Error en conexion connection la BD, error: ${error.response.status}`);
    }
}

/**
 * Validate if one user exist
 * @param user login of the user
 */
export const getUser = async (user: string) => {
    let sql = `SELECT * FROM usuario WHERE login = '${user}' or email = '${user}'`;
    try {
        let { data } = await axios.post(`${dataURL}/query`, { sql: sql });
        return data;
    } catch (error) {
        if(error.response.status ==='400') throw new Error('BD_SYNTAX_ERROR');
        throw new Error(`Error en conexion connection la BD, error: ${error.response.status}`);
    }
}

/**
 * Get a company data
 * @param id id of the company
 */
export const empresa = async (id: string) => {
    let sql = `SELECT * FROM empresa WHERE id = ${id}`;
    try {
        let { data } = await axios.post(`${dataURL}/query`, { sql: sql });
        return data;
    } catch (error) {
        if(error.response.status ==='400') throw new Error('BD_SYNTAX_ERROR');
        throw new Error(`Error en conexion connection la BD, error: ${error.response.status}`);
    }
}


