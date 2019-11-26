import * as areas from '../../helpers/consult';
import * as links from '../../helpers/links'
import { Request } from 'express';
import { IBanco } from './model';

const model = "banco";

export const get = async (req:Request): Promise<any> =>{
    try {
        const { query } = req;
        let data:IBanco[] = await areas.get(model,query);
        let totalCount: number = await areas.count(model);
        let count = data.length;
        let { limit } = query;
        if(count > 0){
            let link = links.pages(data, 'banco', count, totalCount, limit);
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
        let data:IBanco[] = await areas.getOne(model,id,query);
        let count:number = await areas.count(model);
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

export const create = async (req:Request): Promise<any> =>{
    let {data} = req.body;
    let newArea: IBanco = data;
    try {
        let {insertId} = await areas.create(model,newArea);
        let link = links.created('banco',insertId);
        let response = Object.assign({message:"Registro insertado en la base de datos"},{link:link});
        return {response,code:201};
    } catch (error) {
        throw new Error(`Error al consultar la base de datos, error: ${error}`);
    }
}

export const update = async (req:Request): Promise<any>=>{
    const {id} = req.params;
    let {data} = req.body;
    let newArea:IBanco = data;

    try {
        let {affectedRows}  = await areas.update(model,id,newArea);
        let link = links.created('banco',id);
        let response = Object.assign({message:"Registro actualizado en la base de datos",affectedRows},{link:link});
        return {response,code:201};
    } catch (error) {
        throw new Error(`Error al consultar la base de datos, error: ${error}`);
    }
}

export const remove = async (req:Request):Promise<any> => {
    let {id} = req.params;
    try {
        await areas.remove(model,id);
        return {response:{message:"Registro eliminado de la base de datos"},code:200};   
    } catch (error) {
        throw new Error(`Error al consultar la base de datos, error: ${error}`);
    }
}