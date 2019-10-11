import * as grupo from './model';
import {Request} from 'express';
import  * as links from '../../helpers/links';

export const get = async (req:Request) => {
    let {query} = req;
    try {
        let data:any = await grupo.get(query);
        let totalCount:number = await grupo.count();
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
export const getOne = async (id:string | number ,query:any) => {
    try {
        let data:any = await grupo.getOne(id,query);
        let count = await grupo.count();
        data = data[0];
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

export const getSubGruposByGrupo = async (id:string | number ,query:any ) => {
    try {
        let recurso:any = await grupo.getOne(id,{fields:'id'});
        if(recurso.length < 1){
            return {response:{message:"No se encontro el recurso indicado"}, code:404};
        }
        let data:any = await grupo.getOtherByMe(id,query,'subgrupos');
        let totalCount = await grupo.countOther('subgrupos',id);
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
export const getConceptosByGrupo = async (id:string | number ,query:any) => {
    try {
        let recurso:any = await grupo.getOne(id,{fields:'id'});
        if(recurso.length < 1){
            return {response:{message:"No se encontro el recurso indicado"}, code:404};
        }
        let data:any = await grupo.getOtherByMe(id,query,'conceptos');
        let totalCount = await grupo.countOther('conceptos',id);
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

export const create = async (req:Request) =>{
    let {data} = req.body;
    try {
        let {insertId} = await grupo.create(data) as any;
        let link = links.created('grupos',insertId);
        let response = Object.assign({message:"Registro insertado en la base de datos"},{link:link});
        return {response,code:201};
    } catch (error) {
        throw new Error(`Error al consultar la base de datos, error: ${error}`);
    }
}

export const update = async (req:Request) => {
    let {id} = req.params;
    let {data} = req.body;
    try {
        let {affectedRows} = await grupo.update(id,data) as any;
        let link = links.created('grupos',id);
        let response = Object.assign({message:"Registro actualizado en la base de datos",affectedRows},{link:link});
        return {response,code:201};
    } catch (error) {
        throw new Error(`Error al consultar la base de datos, error: ${error}`);
    }
}

export const remove = async (req:Request) => {
    let {id} = req.params;
    try {
        await grupo.remove(id);
        return {response:{message:"Registro eliminado de la base de datos"},code:200};   
    } catch (error) {
        throw new Error(`Error al consultar la base de datos, error: ${error}`);
    }
}