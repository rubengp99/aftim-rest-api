import * as areas from '../../helpers/consult';
import * as links from '../../helpers/links'
import { IAreasAtencion } from './model';

const model = "rest_areas";

/**
 * Return the last 50 areas of attention
 * @param query the modifier of the consult
 */
export const get = async (query:any): Promise<any> =>{
    try {
        let data:IAreasAtencion[] = await areas.get(model,query);
        let totalCount: number = await areas.count(model);
        let count = data.length;
        let { limit } = query;

        if(count <= 0) return { message: "No se encontraron registros",code:200}

        let link = links.pages(data, 'areas_atencion', count, totalCount, limit);
        let response = Object.assign({ totalCount, count, data }, link);

        return {response,code:200};
    } catch (error) {
        throw new Error(`Error en el controlador ${model}, error: ${error}`);
    }
}

/**
 * return one area of attention
 * @param id id of the area
 * @param query object to modify the consult
 */
export const getOne = async (id:string | number ,query:any): Promise<any> =>{
    try {
        if(isNaN(id as number)) return {message:`${id} no es un ID valido`, code:400};

        let data:IAreasAtencion = await areas.getOne(model,id,query);
        let count:number = await areas.count(model);
        
        if(!data)  return {message:"No se encontro el recurso indicado",code:200};
    
        let link = links.records(data,model,count);
        let response = Object.assign({data},link);
        return {response,code:200};
            
    } catch (error) {
        throw new Error(`Error en el controlador ${model}, error: ${error}`);
    }
}

/**
 * Create an area of attention
 * @param body the data of the new area
 */
export const create = async (body:any): Promise<any> =>{
    let {data} = body;
    let newArea: IAreasAtencion = data;
    try {
        let {insertId} = await areas.create(model,newArea);
        let link = links.created('areas_atencion',insertId);
        let response = Object.assign({message:"Registro insertado en la base de datos"},{link:link});
        return {response,code:201};
    } catch (error) {
        throw new Error(`Error en el controlador ${model}, error: ${error}`);
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
        let {affectedRows}  = await areas.update(model,id,newArea);
        let link = links.created('areas_atencion',id);
        let response = Object.assign({message:"Registro actualizado en la base de datos",affectedRows},{link:link});
        return {response,code:201};
    } catch (error) {
        throw new Error(`Error en el controlador ${model}, error: ${error}`);
    }
}

/**
 * Delete a register from the areas
 * @param params the object of params request
 */
export const remove = async (params:any):Promise<any> => {
    let {id} = params;
    try {
        await areas.remove(model,id);
        return {message:"Registro eliminado de la base de datos",code:200};   
    } catch (error) {
        throw new Error(`Error en el controlador ${model}, error: ${error}`);
    }
}