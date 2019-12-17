import * as empresa from '../../helpers/consult';
import * as links from '../../helpers/links'
import { Request } from 'express';
import { IEmpresa } from './model';

const model = "empresa";

export const get = async (req:Request):Promise<any> =>{
    try {
        const { query } = req;
        let data:IEmpresa[] = await empresa.get(model,query);
        let totalCount: number = await empresa.count(model); // consulto el total de registros de la BD
        let count = data.length;
        let { limit } = query;
        if(count > 0){
            let link = links.pages(data, model, count, totalCount, limit);
            let response = Object.assign({ totalCount, count, data }, link);
            return response;
        }else{
            return { message: "No se encontraron registros" };
        }
    } catch (error) {
        throw new Error(`Error en el controlador ${model}, error: ${error}`);
    }
}

export const getOne = async (id:string | number ,query:any): Promise<any>=>{
    try {
        if(isNaN(id as number)){
            return {message:`${id} no es un ID valido`};
        }
        let data:IEmpresa[] = await empresa.getOne(model,id,query);
        let count:number = await empresa.count(model);
        if(data[0]){
            let link = links.records(data,model,count);
            let response = Object.assign({data},link);
            return response;
        }else{
            return {message:"No se encontro el recurso indicado"};
        }
    } catch (error) {
        throw new Error(`Error en el controlador ${model}, error: ${error}`);
    }
}

export const getConceptsByEmpresa = async (id:string | number, query:any):Promise<any>=>{
    try {
        if(isNaN(id as number)){
            return {message:`${id} no es un ID valido`};
        }
        let recurso:IEmpresa = await empresa.getOne(model,id,{fields:'id'});
        if(recurso){
            return {response:{message:"No se encontro el recurso indicado"}, code:404};
        }

        let data:any = await empresa.getOtherByMe(model,id,query,'conceptos');
        let totalCount = await empresa.countOther(model,'conceptos',id);
        let count = data.length;
        let {limit} = query;
        if(count > 0){
            let link = links.pages(data,`empresa/${id}/conceptos`,count,totalCount,limit);
            let response = Object.assign({totalCount,count,data},link);
            return {response,code:200};
        }else{
            return {response:{count,totalCount,message:"No se encontraron registros"},code:200};
        }
    } catch (error) {
        throw new Error(`Error en el controlador ${model}, error: ${error}`);
    }
}
export const getDepositsByEmpresa = async (id:string | number, query:any):Promise<any>=>{
    try {
        if(isNaN(id as number)){
            return {message:`${id} no es un ID valido`};
        }
        let recurso:IEmpresa = await empresa.getOne(model,id,{fields:'id'});
        if(recurso){
            return {response:{message:"No se encontro el recurso indicado"}, code:404};
        }

        let data:any = await empresa.getOtherByMe(model,id,query,'depositos');
        let totalCount = await empresa.countOther(model,'depositos',id);
        let count = data.length;
        let {limit} = query;
        if(count > 0){
            let link = links.pages(data,`empresa/${id}/depositos`,count,totalCount,limit);
            let response = Object.assign({totalCount,count,data},link);
            return {response,code:200};
        }else{
            return {response:{count,totalCount,message:"No se encontraron registros"},code:200};
        }
    } catch (error) {
        throw new Error(`Error en el controlador ${model}, error: ${error}`);
    }
}


export const create = async (req:Request): Promise<any> =>{
    let {data} = req.body;
    let newCliente: IEmpresa = data;
    try {
        let {insertId} = await empresa.create(model,newCliente);
        let link = links.created(model,insertId);
        let response = Object.assign({message:"Registro insertado en la base de datos"},{link:link});
        return {response,code:201};
    } catch (error) {
        throw new Error(`Error en el controlador ${model}, error: ${error}`);
    }
}

export const update = async (req:Request): Promise<any>=>{
    const {id} = req.params;
    let {data} = req.body;
    let newCliente:IEmpresa = data;

    try {
        let {affectedRows}  = await empresa.update(model,id,newCliente);
        let link = links.created(model,id);
        let response = Object.assign({message:"Registro actualizado en la base de datos",affectedRows},{link:link});
        return {response,code:201};
    } catch (error) {
        throw new Error(`Error en el controlador ${model}, error: ${error}`);
    }
}

export const remove = async (req:Request):Promise<any> => {
    let {id} = req.params;
    try {
        await empresa.remove(model,id);
        return {response:{message:"Registro eliminado de la base de datos"},code:200};   
    } catch (error) {
        throw new Error(`Error en el controlador ${model}, error: ${error}`);
    }
}