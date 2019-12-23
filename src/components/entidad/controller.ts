import * as entidad from '../../helpers/consult';
import * as links from '../../helpers/links'
import { Request } from 'express';
import { IEntidad } from './model';

const model = "entidad";

/**
 * Get all entities
 * @param query modifier of the consult
 */
export const get = async (query: any): Promise<any> =>{
    try {
        let data:IEntidad[] = await entidad.get(model,query);
        let totalCount: number = await entidad.count(model);
        let count = data.length;
        let { limit } = query;
        if(count > 0){
            let link = links.pages(data, 'entidad', count, totalCount, limit);
            let response = Object.assign({ totalCount, count, data }, link);
            return response;
        }else{
            return { message: "No se encontraron registros" }
        }
    } catch (error) {
        throw new Error(`Error al consultar la base de datos, error: ${error}`);
    }
}

/**
 * Get one entity
 * @param id id of the entity
 * @param query modifier of the consult
 */
export const getOne = async (id:string | number ,query:any): Promise<any> =>{
    try {
        if(isNaN(id as number)){
            return {message:`${id} no es un ID valido`};
        }
        let data:IEntidad[] = await entidad.getOne(model,id,query);
        let count:number = await entidad.count(model);
        if(data[0]){
            let link = links.records(data,model,count);
            
            let response = Object.assign({data},link);
            return response;
        }else{
            return {message:"No se encontro el recurso indicado"};
        }
    } catch (error) {
        throw new Error(`Error al consultar la base de datos, error: ${error}`);
    }
}

/**
 * Create a new entity
 * @param body data of the new entity
 */
export const create = async (body: any): Promise<any> =>{
    let {data} = body;
    let newArea: IEntidad = data;
    try {
        let {insertId} = await entidad.create(model,newArea);
        let link = links.created('entidad',insertId);
        let response = Object.assign({message:"Registro insertado en la base de datos"},{link:link});
        return {response,code:201};
    } catch (error) {
        throw new Error(`Error al consultar la base de datos, error: ${error}`);
    }
}

/**
 * Update a entity
 * @param params paramas request object
 * @param body data of the entity
 */
export const update = async (params: any, body:any): Promise<any>=>{
    const {id} = params;
    let {data} = body;
    let newArea:IEntidad = data;

    try {
        let {affectedRows}  = await entidad.update(model,id,newArea);
        let link = links.created('entidad',id);
        let response = Object.assign({message:"Registro actualizado en la base de datos",affectedRows},{link:link});
        return {response,code:201};
    } catch (error) {
        throw new Error(`Error al consultar la base de datos, error: ${error}`);
    }
}

export const remove = async (params: any):Promise<any> => {
    let {id} = params;
    try {
        await entidad.remove(model,id);
        return {response:{message:"Registro eliminado de la base de datos"},code:200};   
    } catch (error) {
        throw new Error(`Error al consultar la base de datos, error: ${error}`);
    }
}