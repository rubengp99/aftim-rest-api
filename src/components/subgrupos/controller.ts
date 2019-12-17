import * as subgrupo from '../../helpers/consult';
import {ISubgrupo} from './model';
import {Request} from 'express';
import  * as links from '../../helpers/links';
const model = "subgrupos";
export const get = async (req:Request):Promise<any>=>{
    let {query} = req;
    try {
        let data:ISubgrupo[] = await subgrupo.get(model,query);
        let totalCount:number = await subgrupo.count(model);
        let count = data.length;
        let {limit} = query;
        if(count > 0){
            let link = links.pages(data,'subgrupos',count,totalCount,limit);
            let response = Object.assign({totalCount,count,data},link);
            return response;
        }else{
            return {message:"No se encontraron registros"}
        }
    } catch (error) {
        throw new Error(`Error al consultar la base de datos, error: ${error}`);
    }
}
export const getOne = async (id:string | number ,query:any):Promise<any>=>{
    try {
        let data:ISubgrupo = await subgrupo.getOne(model,id,query);
        let count = await subgrupo.count(model);
        if(data){
            let link = links.records(data,'subgrupos',count);
            let response = Object.assign({data},link);
            return response;
        }else{
            return {message:"No se encontro el recurso indicado"};
        }
    } catch (error) {
        throw new Error(`Error al consultar la base de datos, error: ${error}`);
    }
}
export const getConceptosBySubgrupo = async (id:string | number ,query:any):Promise<any>=>{
    try {
        let recurso:ISubgrupo = await subgrupo.getOne(model,id,{fields:'id'});
        if(!recurso){
            return {response:{message:"No se encontro el recurso indicado"}, code:404};
        }
        let data:any = await subgrupo.getOtherByMe(model,id,'conceptos',query);
        let totalCount = await subgrupo.countOther(model,'conceptos',id);
        let count = data.length;
        let {limit} = query;
        if(count > 0){
            let link = links.pages(data,`grupos/${id}/conceptos`,count,totalCount,limit);
            let response = Object.assign({totalCount,count,data},link);
            return {response,code:200};
        }else{
            return {response:{count,totalCount,message:"No se encontraron registros"},code:200};
        }
    } catch (error) {
        throw new Error(`Error al consultar la base de datos, error: ${error}`);
    }
}
export const create = async (req:Request):Promise<any>=>{
    let {data} = req.body;
    let newGrupo:ISubgrupo = data;
    try {
        let {insertId} = await subgrupo.create(model,newGrupo) as any;
        let link = links.created('grupos',insertId);
        let response = Object.assign({message:"Registro insertado en la base de datos"},{link:link});
        return {response,code:201};
    } catch (error) {
        throw new Error(`Error al consultar la base de datos, error: ${error}`);
    }
}
export const update = async (req:Request):Promise<any>=>{
    let {id} = req.params;
    let {data} = req.body;
    let newGrupo:ISubgrupo = data;
    try {
        let {affectedRows} = await subgrupo.update(model,id,newGrupo) as any;
        let link = links.created('grupos',id);
        let response = Object.assign({message:"Registro actualizado en la base de datos",affectedRows},{link:link});
        return {response,code:201};
    } catch (error) {
        throw new Error(`Error al consultar la base de datos, error: ${error}`);
    }
}

export const remove = async (req:Request):Promise<any>=>{
    let {id} = req.params;
    try {
        await subgrupo.remove(model,id);
        return {response:{message:"Registro eliminado de la base de datos"},code:200};   
    } catch (error) {
        throw new Error(`Error al consultar la base de datos, error: ${error}`);
    }
}