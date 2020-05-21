import * as consult from '../../helpers/consult';
import * as links from '../../helpers/links'
import * as respuestas from '../../errors';
import { IAreasAtencion } from './model';

const model = "rest_areas";

/**
 * Return the last 50 areas of attention
 * @param query the modifier of the consult
 */
export const get = async (query:any): Promise<any> =>{
    try {
        let data: IAreasAtencion[] = await consult.get(model,query);
        let totalCount: number = await consult.count(model);
        let count = data.length;
        let { limit } = query;

        if(count <= 0) return respuestas.Empty;
        let link = links.pages(data, 'areas_atencion', count, totalCount, limit);
        let response = Object.assign({ totalCount, count, data },link);

        return {response,code:respuestas.Ok.code};
    } catch (error) {
        if(error.message === 'BD_SYNTAX_ERROR') return respuestas.BadRequest;
        console.log(`Error en el controlador ${model}, error: ${error}`);
        return respuestas.InternalServerError; 
    }
}

/**
 * return one area of attention
 * @param id id of the area
 * @param query object to modify the consult
 */
export const getOne = async (id:string | number ,query:any): Promise<any> =>{
    try {
        if(isNaN(id as number)) return respuestas.InvalidID;

        let data:IAreasAtencion = await consult.getOne(model,id,query);
        let count:number = await consult.count(model);
        if(!data)  return respuestas.ElementNotFound;
    
        let link = links.records(data,'areas_atencion',count);
        let response = {data,link:link};
        return {response,code:respuestas.Ok.code};
            
    } catch (error) {
        if(error.message === 'BD_SYNTAX_ERROR') return respuestas.BadRequest;
        console.log(`Error en el controlador ${model}, error: ${error}`);
        return respuestas.InternalServerError;
    }
}

/**
 * Create an area of attention
 * @param body the data of the new area
 */
export const create = async (body:any): Promise<any> =>{
    let {data} = body;
    try {
        let newArea: IAreasAtencion = data;
        let {insertId} = await consult.create(model,newArea);
        let link = links.created('areas_atencion',insertId);
        let response = Object.assign({message:respuestas.Created.message},{link:link});
        return {response,code:respuestas.Created.code};
    } catch (error) {
        if(error.message === 'BD_SYNTAX_ERROR') return respuestas.BadRequest;
        console.log(`Error en el controlador ${model}, error: ${error}`);
        return respuestas.InternalServerError;
    }
}

/**
 * Update an area of attention
 * @param params the object of the params request
 * @param body the data of the area to update 
 */
export const update = async (params:any,body:any): Promise<any>=>{
    const {id} = params;
    let {data} = body;
    let newArea:IAreasAtencion = data;
    try {
        if(isNaN(id as number)) return respuestas.InvalidID;
        let {affectedRows}  = await consult.update(model,id,newArea);
        let link = links.created('areas_atencion',id);
        let response = Object.assign({message:respuestas.Update.message,affectedRows},{link:link});
        return {response,code:respuestas.Update.code};
    } catch (error) {
        if(error.message === 'BD_SYNTAX_ERROR') return respuestas.BadRequest;
        console.log(`Error en el controlador ${model}, error: ${error}`);
        return respuestas.InternalServerError;
    }
}

/**
 * Delete a register from the areas
 * @param params the object of params request
 */
export const remove = async (params:any):Promise<any> => {
    let {id} = params;
    try {
        if(isNaN(id as number)) return respuestas.InvalidID;
        await consult.remove(model,id);
        return respuestas.Deleted;   
    } catch (error) {
        console.log(`Error en el controlador ${model}, error: ${error}`);
        return respuestas.InternalServerError;
    }
}