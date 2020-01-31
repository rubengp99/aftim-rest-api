import * as consult from '../../helpers/consult';
import * as links from '../../helpers/links';
import * as respuestas from '../../errors';
import { IConcepto } from './model';

const model = 'conceptos';

/**
 * Get all last concepts
 * @param query modifier of the consult
 */
export const get = async (query: any): Promise<any> => {
    try {
        console.log(query)
        let data: IConcepto[] = await consult.get(model, query);// consulto los conceptos
        let totalCount: number = await consult.count(model); // consulto el total de registros de la BD
        let count = data.length;
        let { fields, limit } = query;

        // si se encontraron registros
        if (count <= 0) return respuestas.Empty;
        // si no me pasaron campos requeridos o si en los campos estan las presentaciones entonces
        // consulto las presentaciones de ese producto
        if (!fields || fields.includes('presentaciones')) {
            for (let i = 0; i < data.length; i++) {
                let { id } = data[i];
                let pres = await consult.getOtherByMe(model, id as string, 'presentaciones', {}) as any[];
                data[i].presentaciones = pres;
            }
        }
        let link = links.pages(data, model, count, totalCount, limit);
        let response = Object.assign({ totalCount, count, data }, link);
        return { response, code: respuestas.Ok.code };
    } catch (error) {
        if (error.message === 'BD_SYNTAX_ERROR') return respuestas.BadRequest;
        console.log(`Error en el controlador ${model}, error: ${error}`);
        return respuestas.InternalServerError;
    }
}

/**
 * Get one concept
 * @param id id of the concept
 * @param query modifier of the consult
 */
export const getOne = async (id: string | number, query: any): Promise<any> => {
    try {
        if (isNaN(id as number)) return respuestas.InvalidID;

        let data: IConcepto = await consult.getOne(model, id, query);
        let count = await consult.count(model);
        let { fields } = query;

        if (!data) return respuestas.ElementNotFound;

        if (!fields || fields.includes('presentaciones')) {
            let pres = await consult.getOtherByMe(model, id as string, 'presentaciones', {}) as any[];
            data.presentaciones = pres;
        }
        let link = links.records(data, model, count);
        let response = Object.assign({ data }, link);
        return { response, code: respuestas.Ok.code };
    } catch (error) {
        if (error.message === 'BD_SYNTAX_ERROR') return respuestas.BadRequest;
        console.log(`Error en el controlador ${model}, error: ${error}`);
        return respuestas.InternalServerError;
    }
}

/**
 * Get all the deposits where the concept it is
 * @param id id of the concept
 * @param query modifier of the consult
 */
export const getDepositsByConcept = async (id: string | number, query: any): Promise<any> => {
    try {
        if (isNaN(id as number)) return respuestas.InvalidID;

        let recurso: IConcepto = await consult.getOne(model, id, { fields: 'id' });

        if (!recurso) return respuestas.ElementNotFound;

        let data: any = await consult.getOtherByMe(model, id, 'movimiento_deposito', { fields: 'depositos_id,existencia' });
        let totalCount = await consult.count('depositos');
        let count = data.length;
        let { limit } = query;

        if (count <= 0) return respuestas.Empty;

        let link = links.pages(data, `conceptos/${id}/depositos`, count, totalCount, limit);
        let response = Object.assign({ totalCount, count, data }, link);
        return { response, code: respuestas.Ok.code };

    } catch (error) {
        if (error.message === 'BD_SYNTAX_ERROR') return respuestas.BadRequest;
        console.log(`Error en el controlador ${model}, error: ${error}`);
        return respuestas.InternalServerError;
    }
}

/**
 * Get all the photos of the concept
 * @param id id of the concept
 * @param query modifier of the consult
 */
export const getPhotosByConcept = async (id: string | number, query: any): Promise<any> => {
    try {
        if (isNaN(id as number)) return respuestas.InvalidID;

        let recurso: IConcepto = await consult.getOne(model, id, { fields: 'id' });
        if (!recurso) return respuestas.ElementNotFound;

        let data: any = await consult.getOtherByMe(model, id, 'rest_galeria', query);
        let totalCount = await consult.countOther(model, 'rest_galeria', id);
        let count = data.length;
        let { limit } = query;
        if (count <= 0) return respuestas.Empty;
        let link = links.pages(data, `conceptos/${id}/photos`, count, totalCount, limit);
        let response = Object.assign({ totalCount, count, data }, link);
        return { response, code: respuestas.Ok.code };
    } catch (error) {
        if (error.message === 'BD_SYNTAX_ERROR') return respuestas.BadRequest;
        console.log(`Error en el controlador ${model}, error: ${error}`);
        return respuestas.InternalServerError;
    }
}

/**
 * Get all the presentations of the concept
 * @param id id of the concept
 * @param query modifier of the consult
 */
export const getPresentationsByConcept = async (id: string | number, query: any): Promise<any> => {
    try {
        if (isNaN(id as number)) return respuestas.InvalidID;

        let recurso: IConcepto = await consult.getOne(model, id, { fields: 'id' });
        if (!recurso) return respuestas.ElementNotFound;
        let data: any = await consult.getOtherByMe(model, id, 'presentaciones', query);
        let totalCount = await consult.countOther(model, 'presentaciones', id);
        let count = data.length;
        let { limit } = query;
        if (count <= 0) return respuestas.Empty;
        let link = links.pages(data, `conceptos/${id}/presentaciones`, count, totalCount, limit);
        let response = Object.assign({ totalCount, count, data }, link);
        return { response, code: respuestas.Ok.code };
    } catch (error) {
        if (error.message === 'BD_SYNTAX_ERROR') return respuestas.BadRequest;
        console.log(`Error en el controlador ${model}, error: ${error}`);
        return respuestas.InternalServerError;
    }
}

/**
 * Get one top of the most sold concepts
 * @param params params request object
 * @param query modifier of the consult
 */
export const getMostSold = async (params: any, query: any): Promise<any> =>{
    const { limit , order , } = query; 
    try {
        let sql = `SELECT conceptos_id,conceptos.nombre AS nombre, SUM(cantidad) AS vendidos FROM det_facturas
        LEFT JOIN conceptos ON conceptos_id = conceptos.id 
        ${query['after-fecha_at'] ? `WHERE det_facturas.fecha_at >= '${query['after-fecha_at']}'`: '' }
        ${query['before-fecha_at'] ? `${query['before-fecha_at'] ? 'AND' : 'WHERE'} det_facturas.fecha_at <= '${query['before-fecha_at']}'`: '' }
        GROUP BY conceptos_id ORDER BY vendidos ${order ? order : 'desc'} LIMIT ${limit ? limit : 10}`;
        let data:any[] = await consult.getPersonalized(sql);
        let totalCount: number = await consult.count(model); // consulto el total de registros de la BD
        let count = data.length;

        if (count <= 0) return respuestas.Empty;
        
        let response = { totalCount, count, data }
        return { response, code: respuestas.Ok.code };
    } catch (error) {
        if (error.message === 'BD_SYNTAX_ERROR') return respuestas.BadRequest;
        console.log(`Error en el controlador ${model}, error: ${error}`);
        return respuestas.InternalServerError;
    }
}


/**
 * Create a new concept
 * @param body data of the concept
 */
export const create = async (body: any, file: any): Promise<any> => {
    let { data, data1 } = body;
    let newConcepto: IConcepto = typeof data == 'string' ? JSON.parse(data) : data;
    if(file){
        let { filename = 'default.png' } = file;
        newConcepto.imagen = filename;
    }
    let presentaciones = data1;
    try {
        let { insertId } = await consult.create(model, newConcepto) as any;
        if (presentaciones) {
            presentaciones.forEach(async (element: any) => {
                element.conceptos_id = insertId;
                await consult.create('presentaciones', element);
            });
            newConcepto.presentaciones = presentaciones;
        }
        newConcepto.id = insertId;
        let link = links.created(model, insertId);
        let response = { message: respuestas.Created.message ,data:newConcepto, link: link };
        return { response, code: respuestas.Created.code };
    } catch (error) {
        if (error.message === 'BD_SYNTAX_ERROR') return respuestas.BadRequest;
        console.log(`Error en el controlador ${model}, error: ${error}`);
        return respuestas.InternalServerError;
    }
}

/**
 * Update a concept
 * @param params params request object
 * @param query data of the concept
 */
export const update = async (params: any, body: any, file: any): Promise<any> => {
    let { id } = params;
    let { data, data1 } = body;
    let newGrupo: IConcepto = typeof data == 'string' ? JSON.parse(data) : data;
    let presentaciones = data1;
    if(file) newGrupo.imagen = file.filename;
    try {
        if (isNaN(id as number)) return respuestas.InvalidID;

        let { affectedRows } = await consult.update(model, id, newGrupo) as any;
        if (presentaciones) {
            presentaciones.forEach(async (element: any) => {
                await consult.update('presentaciones', element.id, element);
            });
        }
        let link = links.created(model, id);
        let response = Object.assign({ message: respuestas.Update.message, affectedRows }, { link: link });
        return { response, code: respuestas.Update.code };
    } catch (error) {
        if (error.message === 'BD_SYNTAX_ERROR') return respuestas.BadRequest;
        console.log(`Error en el controlador ${model}, error: ${error}`);
        return respuestas.InternalServerError;
    }
}

/**
 * Delete a concept
 * @param params params request object
 */
export const remove = async (params: any): Promise<any> => {
    let { id } = params;
    try {
        if (isNaN(id as number)) return respuestas.InvalidID;

        let pres = await consult.getOtherByMe(model, id as string, 'presentaciones', {}) as any[];
        pres.forEach(async (element: any) => {
            await consult.remove('presentaciones', element.id);
        });
        await consult.remove(model, id);
        return respuestas.Deleted;
    } catch (error) {
        console.log(`Error en el controlador ${model}, error: ${error}`);
        return respuestas.InternalServerError;
    }
}