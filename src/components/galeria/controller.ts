import * as galeria from '../../helpers/consult';
import * as links from '../../helpers/links'
import { Request } from 'express';
import { IGaleria } from './model';

const model = "rest_galeria";

export const get = async (req:Request): Promise<any> =>{
    try {
        const { query } = req;
        let data:IGaleria[] = await galeria.get(model,query);
        let totalCount: number = await galeria.count(model);
        let count = data.length;
        let { limit } = query;
        if(count > 0){
            let link = links.pages(data, 'galeria', count, totalCount, limit);
            let response = Object.assign({ totalCount, count, data }, link);
            return response;
        }else{
            return { message: "No se encontraron registros" }
        }
    } catch (error) {
        throw new Error(`Error al consultar la base de datos, error: ${error}`);
    }
}

export const getOne = async (id:string | number ,query:any): Promise<any> =>{
    try {
        if(isNaN(id as number)){
            return {message:`${id} no es un ID valido`};
        }
        let data:IGaleria[] = await galeria.getOne(model,id,query);
        let count:number = await galeria.count(model);
        if(data[0]){
            let link = links.records(data,'galeria',count);
            
            let response = Object.assign({data},link);
            return response;
        }else{
            return {message:"No se encontro el recurso indicado"};
        }
    } catch (error) {
        throw new Error(`Error al consultar la base de datos, error: ${error}`);
    }
}

export const create = async (req:Request): Promise<any> =>{
    let {data} = req.body;
    let newArea: IGaleria = data;
    try {
        let {insertId} = await galeria.create(model,newArea);
        let link = links.created('galeria',insertId);
        let response = Object.assign({message:"Registro insertado en la base de datos"},{link:link});
        return {response,code:201};
    } catch (error) {
        throw new Error(`Error al consultar la base de datos, error: ${error}`);
    }
}

export const update = async (req:Request): Promise<any>=>{
    const {id} = req.params;
    let {data} = req.body;
    let newArea:IGaleria = data;

    try {
        let {affectedRows}  = await galeria.update(model,id,newArea);
        let link = links.created('galeria',id);
        let response = Object.assign({message:"Registro actualizado en la base de datos",affectedRows},{link:link});
        return {response,code:201};
    } catch (error) {
        throw new Error(`Error al consultar la base de datos, error: ${error}`);
    }
}

export const remove = async (req:Request):Promise<any> => {
    let {id} = req.params;
    try {
        await galeria.remove(model,id);
        return {response:{message:"Registro eliminado de la base de datos"},code:200};   
    } catch (error) {
        throw new Error(`Error al consultar la base de datos, error: ${error}`);
    }
}