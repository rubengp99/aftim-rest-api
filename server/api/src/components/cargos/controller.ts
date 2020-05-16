import * as consult from '../../helpers/consult';
import * as links from '../../helpers/links'
import * as respuestas from '../../errors';
import { ICargo } from './model';

const model = "adm_cargos";

/**
 * Get all last 50 cargos
 * @param query object modifier of the consult
 */
export const get = async (query:any): Promise<any> =>{
    try {
        let data:ICargo[] = await consult.get(model,query);
        let totalCount: number = await consult.count(model);
        let count = data.length;
        let { limit } = query;
        if(count <= 0) return respuestas.Empty;
        let link = links.pages(data, model, count, totalCount, limit);
        let response = Object.assign({ totalCount, count, data }, link);
        return {response,code:respuestas.Ok.code};
    } catch (error) {
        if(error.message==='BD_SYNTAX_ERROR') return respuestas.BadRequest;
        console.log(`Error en el controlador ${model}, error: ${error}`);
        return respuestas.InternalServerError;
    }
}


/**
 * Get one cargo
 * @param id id of the cargo
 * @param query object modifier of the cargo
 */
export const getOne = async (id:string | number ,query:any): Promise<any> =>{
    try {
        if(isNaN(id as number)) return respuestas.InvalidID;
        let data:ICargo = await consult.getOne(model,id,query);
        let count:number = await consult.count(model);
        if(!data) return respuestas.ElementNotFound;
        let link = links.records(data,model,count);
        let response = Object.assign({data},link);
        return {response,code:respuestas.Ok.code};
    } catch (error) {
        if(error.message==='BD_SYNTAX_ERROR') return respuestas.BadRequest;
        console.log(`Error en el controlador ${model}, error: ${error}`);
        return respuestas.InternalServerError;
    }
}

/**
 *Create a new cargo 
 * @param body data of the new cargo
 */
export const create = async (body:any): Promise<any> =>{
    let {data} = body;
    let newCargo: ICargo = data;
    try {
        let {insertId} = await consult.create(model,newCargo);
        let movDep:any[] = await consult.get("adm_movimiento_deposito",{depositos_id:newCargo.adm_depositos_id,adm_conceptos_id:newCargo.adm_conceptos_id});
        movDep[0].existencia += +newCargo.cantidad;
        let {affectedRows} = await consult.update("adm_movimiento_deposito",movDep[0].id,movDep[0]);
        let link = links.created(model,insertId);
        let response = Object.assign({message:respuestas.Created.message},{link:link});
        return {response,code:respuestas.Created.code};
    } catch (error) {
        if(error.message==='BD_SYNTAX_ERROR') return respuestas.BadRequest;
        console.log(`Error en el controlador ${model}, error: ${error}`);
        return respuestas.InternalServerError;
    }
}