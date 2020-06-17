import * as consult from '../../helpers/consult';
import * as respuestas from '../../errors';
import {IMarcas} from './model';
import  * as links from '../../helpers/links';
const model = "adm_marcas";

/**
 * Get all brands
 * @param query modifier of the consult
 */
export const get = async (query: any, tenantId: string): Promise<any> => {
    try {
        let data:IMarcas[] = await consult.get(tenantId, model,query);
        let totalCount:number = await consult.count(tenantId, model);
        let count = data.length;
        let {limit} = query;

        if(count <= 0) return respuestas.Empty;

        let link = links.pages(data,model,count,totalCount,limit);
        let response = Object.assign({totalCount,count,data},link);
        
        return {response,code:respuestas.Ok.code};
    } catch (error) {
        if(error.message ==='BD_SYNTAX_ERROR') return respuestas.BadRequest;
        console.log(`Error al consultar la base de datos, error: ${error}`);
        return respuestas.InternalServerError;
    }
}

/**
 * Get a brand
 * @param id id of the brand
 * @param query modifier of the consult
 */
export const getOne = async (id:string | number ,query:any, tenantId: string): Promise<any> => {
    try {
        if(isNaN(id as number)) return respuestas.InvalidID;
        
        let data:IMarcas = await consult.getOne(tenantId, model,id,query);
        let count = await consult.count(tenantId, model);
        
        if(!data) return respuestas.ElementNotFound;
        
        let link = links.records(data,model,count);
        let response = Object.assign({data},link);
        
        return {response, code: respuestas.Ok.code};
    } catch (error) {
        if(error.message ==='BD_SYNTAX_ERROR') return respuestas.BadRequest;
        console.log(`Error al consultar la base de datos, error: ${error}`);
        return respuestas.InternalServerError;
    }
}

/**
 * Get all the concepts of one brand
 * @param id id of the brand
 * @param query modifier of the consult
 */
export const getConceptosByMarca = async (id:string | number ,query:any, tenantId: string): Promise<any> => {
    try {
        if(isNaN(id as number)) return respuestas.InvalidID;
        
        let recurso:IMarcas = await consult.getOne(tenantId, model,id,{fields:'id'});
        
        if(!recurso) return respuestas.ElementNotFound;
        
        let data:any = await consult.getOtherByMe(tenantId, model,id,'adm_conceptos',query);
        let totalCount = await consult.countOther(tenantId, model,'adm_conceptos',id);
        let count = data.length;
        let {limit} = query;
        
        if(count <= 0) return respuestas.Empty

        let link = links.pages(data,`${model}/${id}/conceptos`,count,totalCount,limit);
        let response = Object.assign({totalCount,count,data},link);
        
        return {response,code:respuestas.Ok.code};
    } catch (error) {
        if(error.message ==='BD_SYNTAX_ERROR') return respuestas.BadRequest;
        console.log(`Error al consultar la base de datos, error: ${error}`);
        return respuestas.InternalServerError;
    }
}

/**
 * Creat a new brand
 * @param body data of the new brand 
 */
export const create = async (body:any, tenantId: string): Promise<any> =>{
    let {data} = body;
    let newGrupo:IMarcas = data;
    try {
        let {insertId} = await consult.create(tenantId, model,newGrupo) as any;
        let link = links.created(model,insertId);
        let response = Object.assign({message:respuestas.Created.message},{link:link});
        
        return {response,code:respuestas.Created.code};
    } catch (error) {
        if(error.message ==='BD_SYNTAX_ERROR') return respuestas.BadRequest;
        console.log(`Error al consultar la base de datos, error: ${error}`);
        return respuestas.InternalServerError;
    }
}

/**
 * Update a brand data
 * @param params params request object
 * @param body data of the brand
 */
export const update = async (params:any,body:any, tenantId: string): Promise<any> => {
    let {id} = params;
    let {data} = body;
    let newGrupo:IMarcas = data;
    try {
        if(isNaN(id)) return respuestas.InvalidID;
        
        let {affectedRows} = await consult.update(tenantId, model,id,newGrupo) as any;
        let link = links.created(model,id);
        let response = Object.assign({message:respuestas.Update.message,affectedRows},{link:link});
        
        return {response,code:respuestas.Update.code};
    } catch (error) {
        if(error.message ==='BD_SYNTAX_ERROR') return respuestas.BadRequest;
        console.log(`Error al consultar la base de datos, error: ${error}`);
        return respuestas.InternalServerError;
    }
}

/**
 * Delete a brand
 * @param params params request object
 */
export const remove = async (params:any, tenantId: string): Promise<any> => {
    let {id} = params;
    try {
        if(isNaN(id)) return respuestas.InvalidID;
        
        await consult.remove(tenantId, model,id);
        
        return respuestas.Deleted;   
    } catch (error) {
        if(error.message ==='BD_SYNTAX_ERROR') return respuestas.BadRequest;
        console.log(`Error al consultar la base de datos, error: ${error}`);
        return respuestas.InternalServerError;
    }
}
