import * as descargos from '../../helpers/consult';
import * as links from '../../helpers/links'
import { Request } from 'express';
import { IDescargo } from './model';

const model = "enc_descargos";

export const get = async (req:Request): Promise<any> =>{
    try {
        const { query } = req;
        let data:IDescargo[] = await descargos.get(model,query);
        let totalCount: number = await descargos.count(model);
        let count = data.length;
        let { limit } = query;
        if(count > 0){
            for (let i = 0; i < data.length; i++) {
                let { id } = data[i];
                let pres:any[] = await descargos.getOtherByMe(model, id as string, 'det_descargos');
                data[i].detalles = pres;
            }
            let link = links.pages(data, 'descargos', count, totalCount, limit);
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
        let data:IDescargo[] = await descargos.getOne(model,id,query);
        let count:number = await descargos.count(model);
        if(data[0]){
            let pres:any[] = await descargos.getOtherByMe(model, id as string, 'det_descargos');
            data[0].detalles = pres;
            let link = links.records(data,'descargos',count);
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
    let newCargo: IDescargo = data;
    try {
        let {insertId} = await descargos.create(model,newCargo);
        if(insertId){
            for (let index = 0; index < newCargo.detalles.length; index++) {
                let detalle = newCargo.detalles[index];
                let movDep:any[] = await descargos.get("movmiento_depositos",{depositos_id:detalle.depositos_id,conceptos_id:detalle.conceptos_id});
                let {affectedRows} = await descargos.update("movimiento_depositos",movDep[0].id,movDep[0]);
            }
            let link = links.created('descargos',insertId);
            let response = Object.assign({message:"Registro insertado en la base de datos"},{link:link});
            return {response,code:201};
        }
        return {response:"Error al crear entidad"};
    } catch (error) {
        throw new Error(`Error al consultar la base de datos, error: ${error}`);
    }
}