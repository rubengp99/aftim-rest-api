import * as movdep from '../../helpers/consult';
import {IMovimientoDeposito} from './model';
import {Request} from 'express';
import  * as links from '../../helpers/links';
const model = "movimiento_deposito";


export const get = async (req:Request):Promise<any> => {
    let {query} = req;
    try {
        let data:IMovimientoDeposito[] = await movdep.get(model,query);
        let totalCount:number = await movdep.count(model);
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
        let data:IMovimientoDeposito = await movdep.getOne(model,id,query);
        let count = await movdep.count(model);
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


export const create = async (req:Request):Promise<any> =>{
    let {data} = req.body;
    let newMovDep:IMovimientoDeposito = data;
    try {
        let {insertId} = await movdep.create(model,newMovDep) as any;
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
    let newMovDep:IMovimientoDeposito = data;
    try {
        let {affectedRows} = await movdep.update(model,id,newMovDep) as any;
        let link = links.created(model,id);
        let response = Object.assign({message:"Registro actualizado en la base de datos",affectedRows},{link:link});
        return {response,code:201};
    } catch (error) {
        throw new Error(`Error al consultar la base de datos, error: ${error}`);
    }
}

export const remove = async (req:Request):Promise<any> => {
    let {id} = req.params;
    try {
        await movdep.remove(model,id);
        return {response:{message:"Registro eliminado de la base de datos"},code:200};   
    } catch (error) {
        throw new Error(`Error al consultar la base de datos, error: ${error}`);
    }
}