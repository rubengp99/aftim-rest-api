import * as tipos from '../../helpers/consult';
import * as links from '../../helpers/links';
import { ITipoConceptos } from './model';

const model_1 = "tipos_conceptos"

/**
 * Get all the types of concepts
 * @param query modifier of the consult
 */
export const getTiposConceptos = async (query: any): Promise<any> => {
    try {
        let data:ITipoConceptos[] = await tipos.get(model_1, query);
        let totalCount: number = await tipos.count(model_1);
        let count = data.length;
        let { limit } = query;
        if (count > 0) {
            let link = links.pages(data, 'tipos/conceptos', count, totalCount, limit);
            let response = Object.assign({ totalCount, count, data }, link);
            return response;
        } else {
            return { message: "No se encontraron registros" }
        }
    } catch (error) {
        throw new Error(`Error en el controlador ${model_1}, error: ${error}`);
    }
}

export const getOneTipoConcepto = async (id: string | number, query: any): Promise<any> => {
    try {
        if (isNaN(id as number)) {
            return { message: `${id} no es un ID valido` };
        }
        let data: ITipoConceptos[] = await tipos.getOne(model_1, id, query);
        let count: number = await tipos.count(model_1);
        if (data[0]) {
            let link = links.records(data, 'tipos/conceptos', count);
            let response = Object.assign({ data }, link);
            return response;
        } else {
            return { message: "No se encontro el recurso indicado" };
        }
    } catch (error) {
        throw new Error(`Error en el controlador ${model_1}, error: ${error}`);
    }
}