import * as tipos from '../../helpers/consult';
import * as links from '../../helpers/links';
import * as respuestas from '../../errors';
import { ITipoConceptos } from './model';

const model = "adm_tipos_conceptos"

/**
 * Get all the types of concepts
 * @param query modifier of the consult
 */
export const getTiposConceptos = async (query: any, tenantId: string): Promise<any> => {
    try {
        let data: ITipoConceptos[] = await tipos.get(tenantId, model, query);
        let totalCount: number = await tipos.count(tenantId, model);
        let count = data.length;
        let { limit } = query;
        
        if (count <= 0) return respuestas.Empty;
        
        let link = links.pages(data, 'tipos/conceptos', count, totalCount, limit);
        let response = Object.assign({ totalCount, count, data }, link);
        
        return { response, code: respuestas.Ok.code };
    } catch (error) {
        if (error.message === 'BD_SYNTAX_ERROR') return respuestas.BadRequest;
        console.log(`[ERROR] on controller: ${model}. \n ${error} `);
        return respuestas.InternalServerError;
    }
}

/**
 * Get one type of concept
 * @param id id of the type
 * @param query modifier of the consult
 */
export const getOneTipoConcepto = async (id: string | number, query: any, tenantId: string): Promise<any> => {
    try {
        if (isNaN(id as number)) return respuestas.InvalidID;

        let data: ITipoConceptos = await tipos.getOne(tenantId, model, id, query);
        let count: number = await tipos.count(tenantId, model);
        
        if (!data) return respuestas.ElementNotFound;
        
        let link = links.records(data, 'tipos/conceptos', count);
        let response = Object.assign({ data }, link);
        
        return { response, code: respuestas.Ok.code };
    } catch (error) {
        if (error.message === 'BD_SYNTAX_ERROR') return respuestas.BadRequest;
        console.log(`[ERROR] on controller: ${model}. \n ${error} `);
        return respuestas.InternalServerError;
    }
}