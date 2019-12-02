import * as clientes from '../../helpers/consult';
import * as links from '../../helpers/links'
import { Request } from 'express';
import { ICliente } from './model';

const model = "clientes";

export const get = async (req:Request):Promise<any> =>{
    try {
        const { query } = req;
        let data:ICliente[] = await clientes.get(model,query);
        let totalCount: number = await clientes.count(model); // consulto el total de registros de la BD
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
        throw new Error(`Error al consultar la base de datos, error: ${error}`);
    }
}

export const getOne = async (id:string | number ,query:any): Promise<any>=>{
    try {
        if(isNaN(id as number)){
            return {message:`${id} no es un ID valido`};
        }
        let data:ICliente[] = await clientes.getOne(model,id,query);
        let count:number = await clientes.count(model);
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
    let newCliente: ICliente = data;
    try {
        let {insertId} = await clientes.create(model,newCliente);
        let link = links.created(model,insertId);
        let response = Object.assign({message:"Registro insertado en la base de datos"},{link:link});
        return {response,code:201};
    } catch (error) {
        throw new Error(`Error al consultar la base de datos, error: ${error}`);
    }
}

export const update = async (req:Request): Promise<any>=>{
    const {id} = req.params;
    let {data} = req.body;
    let newCliente:ICliente = data;

    try {
        let {affectedRows}  = await clientes.update(model,id,newCliente);
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
        await clientes.remove(model,id);
        return {response:{message:"Registro eliminado de la base de datos"},code:200};   
    } catch (error) {
        throw new Error(`Error al consultar la base de datos, error: ${error}`);
    }
}