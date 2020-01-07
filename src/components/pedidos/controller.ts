import * as pedidos from '../../helpers/consult';
import * as links from '../../helpers/links';
import * as respuestas from '../../errors';
import { IPedidos, IDetPedidos } from './model';

const model = "rest_pedidos";
const submodel = "rest_det_pedidos"

/**
 * Get all orders
 * @param query modifier of the consult
 */
export const get = async (query: any): Promise<any> => {
    try {
        let data: IPedidos[] = await pedidos.get(model, query);
        let totalCount: number = await pedidos.count(model);
        let count = data.length;
        let { limit } = query;
        if (count <= 0) return respuestas.Empty;

        for (let i = 0; i < data.length; i++) {
            let { id } = data[i];
            let pres: IDetPedidos[] = await pedidos.getOtherByMe(model, id as string, submodel, {});
            data[i].detalles = pres;
        }
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
 * Get one order
 * @param id id of the order
 * @param query modifier of the consult
 */
export const getOne = async (id: string | number, query: any): Promise<any> => {
    try {
        if (isNaN(id as number)) return respuestas.InvalidID;

        let data: IPedidos = await pedidos.getOne(model, id, query);
        let count: number = await pedidos.count(model);

        if (!data) return respuestas.Empty;

        let pres: IDetPedidos[] = await pedidos.getOtherByMe(model, id as string, submodel, {});
        data.detalles = pres;
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
 * Create a new order
 * @param body data of the new order
 */
export const create = async (body: any): Promise<any> => {
    let { data, data1 } = body;
    let newPedido: IPedidos = data;
    let newDetalles: IDetPedidos[] = data1;
    try {
        let { insertId } = await pedidos.create(model, newPedido);
        for (let index = 0; index < newDetalles.length; index++) {
            await pedidos.create(submodel, newDetalles[index]);
            let detalle = newDetalles[index];
            let movDep: any[] = await pedidos.get("movimiento_deposito", { conceptos_id: detalle.conceptos_id });
            await pedidos.update("movimiento_deposito", movDep[0].id, movDep[0]);
        }
        let link = links.created(model, insertId);
        let response = Object.assign({ message: respuestas.Created.message }, { link: link });
        return { response, code: respuestas.Created.code };
    } catch (error) {
        if (error.message === 'BD_SYNTAX_ERROR') return respuestas.BadRequest;
        console.log(`Error al consultar la base de datos, error: ${error}`);
        return respuestas.InternalServerError;
    }
}

/**
 * Delete a order
 * @param params params request object
 */
export const remove = async (params: any): Promise<any> => {
    let { id } = params;
    try {
        if (isNaN(id)) return respuestas.InvalidID;

        const data: IPedidos = await pedidos.getOne(model, id, { fields: 'id' });
        if (!data) return respuestas.ElementNotFound;

        const data1: IDetPedidos[] = await pedidos.get(submodel, { fields: 'id' });
        data1.forEach(async (element: any) => {
            await pedidos.remove(submodel, element.id);
        });
        await pedidos.remove(model, id);
        return respuestas.Deleted;
    } catch (error) {
        if (error.message === 'BD_SYNTAX_ERROR') return respuestas.BadRequest;
        console.log(`Error al consultar la base de datos, error: ${error}`);
        return respuestas.InternalServerError;
    }
}

/**
 * Add a detail to the order
 * @param params paramas request object
 * @param body data of the detail
 */
export const addDetail = async (params: any, body: any): Promise<any> => {
    let { data } = body;
    let { id } = params;
    if (isNaN(id)) return respuestas.InvalidID;
    try {
        const pedido = await pedidos.getOne(model, id, { fields: 'id' });
        if (!pedido) return respuestas.ElementNotFound;
        const newDetail: IDetPedidos = data;
        const { insertId } = await pedidos.create(model, newDetail);
        const link = links.created(model, insertId);
        const response = { message: respuestas.Created.message, link: link }
        return { response, code: respuestas.Created.code };
    } catch (error) {
        if (error.message === 'BD_SYNTAX_ERROR') return respuestas.BadRequest;
        console.log(`Error al consultar la base de datos, error: ${error}`);
        return respuestas.InternalServerError;
    }
}

/**
 * Modify one detail of an order
 * @param params params request object
 * @param body data of the detail
 */
export const updateDetail = async (params: any, body: any): Promise<any> => {
    let { data } = body;
    let { id, id1 } = params;
    if (isNaN(id) || isNaN(id1)) return respuestas.InvalidID;
    try {
        const pedido = await pedidos.getOne(model, id, { fields: 'id' });
        if (!pedido) return respuestas.ElementNotFound;

        const detalle = await pedidos.getOne(submodel, id1, { fields: 'id' });
        if (!detalle) return respuestas.ElementNotFound;

        const newDetail: IDetPedidos = data;
        const { affectedRows } = await pedidos.update(submodel, id1, newDetail);
        const link = links.created(model, id);
        const response = { message: respuestas.Update.message, link: link
        }
        return { response, code: respuestas.Update.code };
    } catch (error) {
        if (error.message === 'BD_SYNTAX_ERROR') return respuestas.BadRequest;
        console.log(`Error al consultar la base de datos, error: ${error}`);
        return respuestas.InternalServerError;
    }
}


/**
 * Remove a detail from the order
 * @param params params request object
 */
export const deleteDetail = async (params: any): Promise<any> => {
    let { id, id1 } = params;
    if (isNaN(id) || isNaN(id1)) return respuestas.InvalidID;
    try {
        const pedido = await pedidos.getOne(model, id, { fields: 'id' });
        if (!pedido) return respuestas.ElementNotFound;

        await pedidos.remove(submodel, id1);

        return respuestas.Deleted;
    } catch (error) {
        if (error.message === 'BD_SYNTAX_ERROR') return respuestas.BadRequest;
        console.log(`Error al consultar la base de datos, error: ${error}`);
        return respuestas.InternalServerError;
    }
}
