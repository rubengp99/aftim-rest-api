import * as areas from '../../helpers/consult';
import * as links from '../../helpers/links'
import { ICambio } from './model';

const model = "cambio";

/**
 * Get the last 50 currencies data
 * @param query object modifier of the consult
 */
export const get = async (query:any): Promise<any> =>{
    try {
        let data:ICambio[] = await areas.get(model,query);
        let totalCount: number = await areas.count(model);
        let count = data.length;
        let { limit } = query;
        if(count > 0){
            let link = links.pages(data, 'cambio', count, totalCount, limit);
            let response = Object.assign({ totalCount, count, data }, link);
            return response;
        }else{
            return { message: "No se encontraron registros" }
        }
    } catch (error) {
        throw new Error(`Error en el controlador ${model}, error: ${error}`);
    }
}

/**
 * Get one currency
 * @param id id of the currency
 * @param query object modifier of the consult
 */
export const getOne = async (id:string | number ,query:any): Promise<any> =>{
    try {
        if(isNaN(id as number)){
            return {message:`${id} no es un ID valido`};
        }
        let data:ICambio[] = await areas.getOne(model,id,query);
        let count:number = await areas.count(model);
        if(data[0]){
            let link = links.records(data,model,count);
            
            let response = Object.assign({data},link);
            return response;
        }else{
            return {message:"No se encontro el recurso indicado"};
        }
    } catch (error) {
        throw new Error(`Error en el controlador ${model}, error: ${error}`);
    }
}

/**
 * Create a new currency
 * @param body data of the currency
 */
export const create = async (body:any): Promise<any> =>{
    let {data} = body;
    let newArea: ICambio = data;
    try {
        let {insertId} = await areas.create(model,newArea);
        let link = links.created('cambio',insertId);
        let response = Object.assign({message:"Registro insertado en la base de datos"},{link:link});
        return {response,code:201};
    } catch (error) {
        throw new Error(`Error en el controlador ${model}, error: ${error}`);
    }
}

/**
 * Update a currency data
 * @param params object params request
 * @param body de data of the currency
 */
export const update = async (params:any,body:any): Promise<any>=>{
    const {id} = params;
    let {data} = body;
    let newArea:ICambio = data;

    try {
        let {affectedRows}  = await areas.update(model,id,newArea);
        let link = links.created('cambio',id);
        let response = Object.assign({message:"Registro actualizado en la base de datos",affectedRows},{link:link});
        return {response,code:201};
    } catch (error) {
        throw new Error(`Error en el controlador ${model}, error: ${error}`);
    }
}

/**
 * Delete a currency
 * @param params obejct params request
 */
export const remove = async (params:any):Promise<any> => {
    let {id} = params;
    try {
        await areas.remove(model,id);
        return {response:{message:"Registro eliminado de la base de datos"},code:200};   
    } catch (error) {
        throw new Error(`Error en el controlador ${model}, error: ${error}`);
    }
}