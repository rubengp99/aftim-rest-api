import * as grupo from '../../helpers/consult';
import {IGrupo} from './model';
import {Request} from 'express';
import  * as links from '../../helpers/links';
const model = "grupos";


export const get = async (req:Request):Promise<any> => {
    let {query} = req;
    try {
        let data:IGrupo[] = await grupo.get(model,query);
        let totalCount:number = await grupo.count(model);
        let count = data.length;
        let {limit} = query;
        if(count > 0){
            let link = links.pages(data,'grupos',count,totalCount,limit);
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
        let data:IGrupo = await grupo.getOne(model,id,query);
        let count = await grupo.count(model);
        if(data){
            let link = links.records(data,'grupos',count);
            let response = Object.assign({data},link);
            return response;
        }else{
            return {message:"No se encontro el recurso indicado"};
        }
    } catch (error) {
        throw new Error(`Error al consultar la base de datos, error: ${error}`);
    }
}

export const getSubGruposByGrupo = async (id:string | number ,query:any ):Promise<any> => {
    try {
        let recurso:IGrupo = await grupo.getOne(model,id,{fields:'id'});
        if(!recurso){
            return {response:{message:"No se encontro el recurso indicado"}, code:404};
        }
        let data:any = await grupo.getOtherByMe(model,id,query,'subgrupos');
        let totalCount = await grupo.countOther(model,'subgrupos',id);
        let count = data.length;
        let {limit} = query;
        if(count > 0){
            let link = links.pages(data,`grupos/${id}/subgrupos`,count,totalCount,limit);
            let response = Object.assign({totalCount,count,data},link);
            return {response,code:200};
        }else{
            return {response:{count,totalCount,message:"No se encontraron registros"},code:200};
        }
    } catch (error) {
        throw new Error(`Error al consultar la base de datos, error: ${error}`);
    }
}
export const getConceptosByGrupo = async (id:string | number ,query:any):Promise<any> => {
    try {
        let recurso:IGrupo = await grupo.getOne(model,id,{fields:'id'});
        if(recurso){
            return {response:{message:"No se encontro el recurso indicado"}, code:404};
        }
        let data:any = await grupo.getOtherByMe(model,id,query,'conceptos');
        let totalCount = await grupo.countOther(model,'conceptos',id);
        let count = data.length;
        let {limit} = query;
        if(count > 0){
            let link = links.pages(data,`grupos/${id}/conceptos`,count,totalCount,limit);
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
    let newGrupo:IGrupo = data;
    try {
        let {insertId} = await grupo.create(model,newGrupo) as any;
        let link = links.created('grupos',insertId);
        let response = Object.assign({message:"Registro insertado en la base de datos"},{link:link});
        return {response,code:201};
    } catch (error) {
        throw new Error(`Error al consultar la base de datos, error: ${error}`);
    }
}

export const update = async (req:Request):Promise<any> => {
    let {id} = req.params;
    let {data} = req.body;
    let newGrupo:IGrupo = data;
    try {
        let {affectedRows} = await grupo.update(model,id,newGrupo) as any;
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
        await grupo.remove(model,id);
        return {response:{message:"Registro eliminado de la base de datos"},code:200};   
    } catch (error) {
        throw new Error(`Error al consultar la base de datos, error: ${error}`);
    }
}