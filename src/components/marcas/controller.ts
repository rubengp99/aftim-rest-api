import * as marcas from '../../helpers/consult';
import {IMarcas} from './model';
import {Request} from 'express';
import  * as links from '../../helpers/links';
const model = "marcas";

export const get = async (req:Request):Promise<any> => {
    let {query} = req;
    try {
        let data:IMarcas[] = await marcas.get(model,query);
        let totalCount:number = await marcas.count(model);
        let count = data.length;
        let {limit} = query;
        if(count > 0){
            let link = links.pages(data,model,count,totalCount,limit);
            let response = Object.assign({totalCount,count,data},link);
            return response;
        }else{
            return {message:"No se encontraron registros"}
        }
    } catch (error) {
        throw new Error(`Error al consultar la base de datos, error: ${error}`);
    }
}
export const getOne = async (id:string | number ,query:any):Promise<any> => {
    try {
        let data:IMarcas = await marcas.getOne(model,id,query);
        let count = await marcas.count(model);
        if(data){
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
export const getConceptosByMarca = async (id:string | number ,query:any):Promise<any> => {
    try {
        let recurso:IMarcas = await marcas.getOne(model,id,{fields:'id'});
        if(recurso){
            return {response:{message:"No se encontro el recurso indicado"}, code:404};
        }
        let data:any = await marcas.getOtherByMe(model,id,query,'conceptos');
        let totalCount = await marcas.countOther(model,'conceptos',id);
        let count = data.length;
        let {limit} = query;
        if(count > 0){
            let link = links.pages(data,`${model}/${id}/conceptos`,count,totalCount,limit);
            let response = Object.assign({totalCount,count,data},link);
            return {response,code:200};
        }else{
            return {response:{message:"No se encontraron registros"},code:200};
        }
    } catch (error) {
        throw new Error(`Error al consultar la base de datos, error: ${error}`);
    }
}

export const create = async (req:Request):Promise<any> =>{
    let {data} = req.body;
    let newGrupo:IMarcas = data;
    try {
        let {insertId} = await marcas.create(model,newGrupo) as any;
        let link = links.created(model,insertId);
        let response = Object.assign({message:"Registro insertado en la base de datos"},{link:link});
        return {response,code:201};
    } catch (error) {
        throw new Error(`Error al consultar la base de datos, error: ${error}`);
    }
}

export const update = async (req:Request):Promise<any> => {
    let {id} = req.params;
    let {data} = req.body;
    let newGrupo:IMarcas = data;
    try {
        let {affectedRows} = await marcas.update(model,id,newGrupo) as any;
        let link = links.created('grupos',id);
        let response = Object.assign({message:"Registro actualizado en la base de datos",affectedRows},{link:link});
        return {response,code:201};
    } catch (error) {
        throw new Error(`Error al consultar la base de datos, error: ${error}`);
    }
}

export const remove = async (req:Request):Promise<any> => {
    let {id} = req.params;
    try {
        await marcas.remove(model,id);
        return {response:{message:"Registro eliminado de la base de datos"},code:200};   
    } catch (error) {
        throw new Error(`Error al consultar la base de datos, error: ${error}`);
    }
}
