import * as unidades from '../../helpers/consult';
import {IUnidades} from './model';
import {Request} from 'express';
import  * as links from '../../helpers/links';
const model = "unidades";


export const get = async (req:Request):Promise<any> => {
    let {query} = req;
    try {
        let data:IUnidades[] = await unidades.get(model,query);
        let totalCount:number = await unidades.count(model);
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
        let data:IUnidades = await unidades.getOne(model,id,query);
        let count = await unidades.count(model);
        if(data){
            let link = links.records(data,'unidades',count);
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
    let newunidades:IUnidades = data;
    try {
        let {insertId} = await unidades.create(model,newunidades) as any;
        let link = links.created('unidades',insertId);
        let response = Object.assign({message:"Registro insertado en la base de datos"},{link:link});
        return {response,code:201};
    } catch (error) {
        throw new Error(`Error al consultar la base de datos, error: ${error}`);
    }
}

export const update = async (req:Request):Promise<any> => {
    let {id} = req.params;
    let {data} = req.body;
    let newunidades:IUnidades = data;
    try {
        let {affectedRows} = await unidades.update(model,id,newunidades) as any;
        let link = links.created('unidades',id);
        let response = Object.assign({message:"Registro actualizado en la base de datos",affectedRows},{link:link});
        return {response,code:201};
    } catch (error) {
        throw new Error(`Error al consultar la base de datos, error: ${error}`);
    }
}

export const remove = async (req:Request):Promise<any> => {
    let {id} = req.params;
    try {
        await unidades.remove(model,id);
        return {response:{message:"Registro eliminado de la base de datos"},code:200};   
    } catch (error) {
        throw new Error(`Error al consultar la base de datos, error: ${error}`);
    }
}