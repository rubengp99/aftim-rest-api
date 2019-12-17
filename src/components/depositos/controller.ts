import * as deposito from '../../helpers/consult';
import {IDeposito} from './model';
import {Request} from 'express';
import  * as links from '../../helpers/links';
const model = "depositos";


export const get = async (req:Request):Promise<any> => {
    let {query} = req;
    try {
        let data:IDeposito[] = await deposito.get(model,query);
        let totalCount:number = await deposito.count(model);
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
        let data:IDeposito = await deposito.getOne(model,id,query);
        let count = await deposito.count(model);
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

export const getConceptosBydeposito = async (id:string | number ,query:any):Promise<any> => {
    try {
        let recurso:IDeposito = await deposito.getOne(model,id,{fields:'id'});
        if(!recurso){
            return {response:{message:"No se encontro el recurso indicado"}, code:404};
        }
        let data:any = await deposito.getOtherByMe(model,id,'movimiento_deposito',{});
        let conceptos:any[] = [];
        for (let index = 0; index < data.length; index++) {
            let concepto = await deposito.getOne('conceptos',data[index].conceptos_id,query);
            conceptos.push(concepto);
        }
        
        let totalCount = await deposito.count('conceptos');
        let count = conceptos.length;
        let {limit} = query;
        if(count > 0){
            let link = links.pages(conceptos,`${model}/${id}/conceptos`,count,totalCount,limit);
            let response = Object.assign({totalCount,count,data:conceptos},link);
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
    let newdeposito:IDeposito = data;
    try {
        let {insertId} = await deposito.create(model,newdeposito) as any;
        let link = links.created('depositos',insertId);
        let response = Object.assign({message:"Registro insertado en la base de datos"},{link:link});
        return {response,code:201};
    } catch (error) {
        throw new Error(`Error al consultar la base de datos, error: ${error}`);
    }
}

export const update = async (req:Request):Promise<any> => {
    let {id} = req.params;
    let {data} = req.body;
    let newdeposito:IDeposito = data;
    try {
        let {affectedRows} = await deposito.update(model,id,newdeposito) as any;
        let link = links.created('depositos',id);
        let response = Object.assign({message:"Registro actualizado en la base de datos",affectedRows},{link:link});
        return {response,code:201};
    } catch (error) {
        throw new Error(`Error al consultar la base de datos, error: ${error}`);
    }
}

export const remove = async (req:Request):Promise<any> => {
    let {id} = req.params;
    try {
        await deposito.remove(model,id);
        return {response:{message:"Registro eliminado de la base de datos"},code:200};   
    } catch (error) {
        throw new Error(`Error al consultar la base de datos, error: ${error}`);
    }
}