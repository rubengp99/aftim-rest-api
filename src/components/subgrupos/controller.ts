import * as consult from '../../helpers/consult';
import * as respuestas from '../../errors';
import { ISubgrupo } from './model';
import * as links from '../../helpers/links';
const model = "adm_subgrupos";


/**
 * Get all subgroups
 * @param query identifier of the consult
 */
export const get = async (query: any): Promise<any> => {
    try {
        let data: ISubgrupo[] = await consult.get(model, query);
        let totalCount: number = await consult.count(model);
        let count = data.length;
        let { limit } = query;

        if (count <= 0) return respuestas.Empty;

        let link = links.pages(data, model, count, totalCount, limit);
        let response = Object.assign({ totalCount, count, data }, link);
        return { response, code: respuestas.Ok.code };

    } catch (error) {
        if (error.message === 'BD_SYNTAX_ERROR') return respuestas.BadRequest;
        console.log(`Error al consultar la base de datos, error: ${error}`);
        return respuestas.InternalServerError;
    }
}

/**
 * Get a subgroup 
 * @param id id of a group
 * @param query modifier of the consult
 */
export const getOne = async (id: string | number, query: any): Promise<any> => {
    try {
        if (isNaN(id as number)) return respuestas.InvalidID;

        let data: ISubgrupo = await consult.getOne(model, id, query);
        let count = await consult.count(model);

        if (!data) return respuestas.ElementNotFound;

        let link = links.records(data, model, count);
        let response = Object.assign({ data }, link);
        return { response, code: respuestas.Ok.code };

    } catch (error) {
        if (error.message === 'BD_SYNTAX_ERROR') return respuestas.BadRequest;
        console.log(`Error al consultar la base de datos, error: ${error}`);
        return respuestas.InternalServerError;
    }
}

/**
 * Get all the concepts of one subgroup
 * @param id id of the subgroup
 * @param query modifier of the consult
 */
export const getConceptosBySubgrupo = async (id: string | number, query: any): Promise<any> => {
    try {
        if (isNaN(id as number)) return respuestas.InvalidID;

        let recurso: ISubgrupo = await consult.getOne(model, id, { fields: 'id' });
        if (!recurso) return respuestas.ElementNotFound;

        let data: any = await consult.getOtherByMe(model, id, 'adm_conceptos', query);
        let totalCount = await consult.countOther(model, 'adm_conceptos', id);
        let count = data.length;
        let { limit } = query;

        if (count <= 0) return respuestas.Empty;
        let link = links.pages(data, `grupos/${id}/conceptos`, count, totalCount, limit);
        let response = Object.assign({ totalCount, count, data }, link);
        return { response, code: respuestas.Ok.code };
    } catch (error) {
        if (error.message === 'BD_SYNTAX_ERROR') return respuestas.BadRequest;
        console.log(`Error al consultar la base de datos, error: ${error}`);
        return respuestas.InternalServerError;
    }
}

export async function getSellBySubgroups(id:string | number,query:any): Promise<any>{
    try {
        if(isNaN(id as number)) return respuestas.InvalidID;

        let data: ISubgrupo = await consult.getOne(model, id, { fields: 'id,nombre' });
       
        if (!data) return respuestas.ElementNotFound;
        let conceptos: any[] = await consult.getOtherByMe(model, id, 'adm_conceptos', {fields:'id'});
        let aux_det:any[] = [];
        for (let index = 0; index < conceptos.length; index++) {
            const element = conceptos[index];
            query.limit = await consult.count('adm_det_facturas');
            let detalles:any[] = await consult.getOtherByMe('adm_conceptos',element.id,'adm_det_facturas',query);
            for (let index = 0; index < detalles.length; index++) {
                const element1 = detalles[index];
                let encabezado = await consult.getOne('adm_enc_facturas', element1.adm_enc_facturas_id,{fields:'id,adm_tipos_facturas_id'});
                if(encabezado.adm_tipos_facturas_id == 1 || encabezado.adm_tipos_facturas_id == 5){
                    aux_det.push(element1);
                }
            }
        }
        let ventas = 0;
        aux_det.forEach((item)=>{
            ventas += parseFloat(item.cantidad);
        });
        ventas = parseFloat(ventas.toFixed(2));
        let response = { ventas, data }
        return { response, code: respuestas.Ok.code };
    } catch (error) {
        if (error.message === 'BD_SYNTAX_ERROR') return respuestas.BadRequest;
        console.log(`Error en el controlador ${model}, error: ${error}`);
        return respuestas.InternalServerError;
    }
}

/**
 * Create a new subgroup
 * @param body 
 */
export const create = async (body:any,file:any): Promise<any> => {
    let { data } = body;
    let newGrupo: ISubgrupo = typeof data == 'string' ? JSON.parse(data) : data;
    if(file){
        let { filename = 'default.png' } = file;
        newGrupo.imagen = filename;
    }
    try {
        let { insertId } = await consult.create(model, newGrupo) as any;
        let link = links.created(model, insertId);
        newGrupo.id = insertId;
        let response = Object.assign({ message: respuestas.Created.message, data:newGrupo }, { link: link });
        return { response, code: respuestas.Created.code };
    } catch (error) {
        if (error.message === 'BD_SYNTAX_ERROR') return respuestas.BadRequest;
        console.log(`Error al consultar la base de datos, error: ${error}`);
        return respuestas.InternalServerError;
    }
}

/**
 * Update a subgroup
 * @param params params request 
 * @param body data of the subgroup
 */
export const update = async (params:any, body:any): Promise<any> => {
    let { id } = params;
    let { data } = body;
    
    let newGrupo: ISubgrupo = data;
    try {
        if(isNaN(id)) return respuestas.InvalidID;
        let { affectedRows } = await consult.update(model, id, newGrupo);
        let link = links.created(model, id);
        let response = Object.assign({ message: respuestas.Update.message, affectedRows }, { link: link });
        return { response, code: respuestas.Update.code };
    } catch (error) {
        if (error.message === 'BD_SYNTAX_ERROR') return respuestas.BadRequest;
        console.log(`Error al consultar la base de datos, error: ${error}`);
        return respuestas.InternalServerError;
    }
}

/**
 * Delete a subgroup
 * @param params params requeste object
 */
export const remove = async (params:any): Promise<any> => {
    let { id } = params;
    try {
        
        if(isNaN(id)) return respuestas.InvalidID;
        await consult.remove(model, id);
        return respuestas.Deleted;
    } catch (error) {
        if (error.message === 'BD_SYNTAX_ERROR') return respuestas.BadRequest;
        console.log(`Error al consultar la base de datos, error: ${error}`);
        return respuestas.InternalServerError;
    }
}