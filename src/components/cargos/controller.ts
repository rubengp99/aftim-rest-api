import * as cargos from '../../helpers/consult';
import * as links from '../../helpers/links'
import { Request } from 'express';
import { ICargo } from './model';

const model = "cargos";

export const get = async (req:Request): Promise<any> =>{
    try {
        const { query } = req;
        let data:ICargo[] = await cargos.get(model,query);
        let totalCount: number = await cargos.count(model);
        let count = data.length;
        let { limit } = query;
        if(count > 0){
            let link = links.pages(data, 'cargos', count, totalCount, limit);
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
        let data:ICargo[] = await cargos.getOne(model,id,query);
        let count:number = await cargos.count(model);
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
    let newCargo: ICargo = data;
    try {
        let {insertId} = await cargos.create(model,newCargo);
        if(insertId){
            let movDep:any[] = await cargos.get("movmiento_depositos",{depositos_id:newCargo.depositos_id,conceptos_id:newCargo.conceptos_id});
            let {affectedRows} = await cargos.update("movimiento_depositos",movDep[0].id,movDep[0]);
            if(affectedRows){
                let link = links.created('banco',insertId);
                let response = Object.assign({message:"Registro insertado en la base de datos"},{link:link});
                return {response,code:201};
            }
            return {response:"Error al crear entidad"};
        }
        return {response:"Error al crear entidad"};
    } catch (error) {
        throw new Error(`Error al consultar la base de datos, error: ${error}`);
    }
}