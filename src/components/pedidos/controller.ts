import * as pedidos from '../../helpers/consult';
import * as links from '../../helpers/links'
import { Request, response } from 'express';
import { IPedidos, IDetPedidos } from './model';

const model  = "rest_pedidos";
const submodel = "rest_det_pedidos"

/**
 * Get all orders
 * @param query modifier of the consult
 */
export const get = async (query: any): Promise<any> =>{
    try {
        let data:IPedidos[] = await pedidos.get(model,query);
        let totalCount: number = await pedidos.count(model);
        let count = data.length;
        let { limit } = query;
        if(count > 0){
            for (let i = 0; i < data.length; i++) {
                let { id } = data[i];
                let pres:IDetPedidos[] = await pedidos.getOtherByMe(model, id as string, submodel,{});
                data[i].detalles = pres;
            }
            let link = links.pages(data, model, count, totalCount, limit);
            let response = Object.assign({ totalCount, count, data }, link);
            return response;
        }else{
            return { message: "No se encontraron registros" }
        }
    } catch (error) {
        throw new Error(`Error en el controlador ${model}, error: ${error}`);
    }
}

/**
 * Get one order
 * @param id id of the order
 * @param query modifier of the consult
 */
export const getOne = async (id:string | number ,query:any): Promise<any> =>{
    try {
        if(isNaN(id as number)){
            return {message:`${id} no es un ID valido`};
        }
        let data:IPedidos[] = await pedidos.getOne(model,id,query);
        let count:number = await pedidos.count(model);
        if(data[0]){
            let pres:IDetPedidos[] = await pedidos.getOtherByMe(model, id as string, submodel,{});
            data[0].detalles = pres;
            let link = links.records(data,model,count);
            let response = Object.assign({data},link);
            return response;
        }else{
            return {message:"No se encontro el recurso indicado"};
        }
    } catch (error) {
        throw new Error(`Error en el controlador ${model}, error: ${error}`);
    }
}

/**
 * Create a new order
 * @param body data of the new order
 */
export const create = async (body: any): Promise<any> =>{
    let {data,data1} = body;
    let newPedido: IPedidos = data;
    let newDetalles: IDetPedidos[] = data1;
    try {
        let {insertId} = await pedidos.create(model,newPedido);
        await pedidos.create(submodel,newDetalles);
        newPedido.detalles = newDetalles;
        if(insertId){
            for (let index = 0; index < newPedido.detalles.length; index++) {
                let detalle = newPedido.detalles[index];
                let movDep:any[] = await pedidos.get("movmiento_depositos",{conceptos_id:detalle.conceptos_id});
                let {affectedRows} = await pedidos.update("movimiento_depositos",movDep[0].id,movDep[0]);
            }
            let link = links.created(model,insertId);
            let response = Object.assign({message:"Registro insertado en la base de datos"},{link:link});
            return {response,code:201};
        }
        return {response:"Error al crear entidad"};
    } catch (error) {
        throw new Error(`Error en el controlador ${model}, error: ${error}`);
    }
}


/**
 * Delete a order
 * @param params params request object
 */
export const remove = async (params: any):Promise<any> => {
    let { id } = params;
    try {
        if(isNaN(id)) return {message:`${id} is not a valid ID`,code:400};

        const data:IPedidos = await pedidos.getOne(model,id,{fields:'id'});
        if(!data) return {message:"Recurso no encontrado",code:404};

        const data1:IDetPedidos[] = await pedidos.get(submodel,{fields:'id'});
        data1.forEach(async (element:any) => {
            await pedidos.remove(submodel,element.id);
        });
        await pedidos.remove(model,id);
        const response = {message:"Registro eliminado en la base de datos",code:201}
        return response;
    } catch (error) {
        throw new Error(`Error en el controlador ${model}, error: ${error}`);
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
    if(isNaN(id)) return {message:`${id} No es un ID valido`,code:400};
    try {
        const pedido = await pedidos.getOne(model,id,{fields:'id'});
        if(!pedido) return {message:"Recurso no encontrado",code:404};
        const newDetail: IDetPedidos = data;
        const { insertId } = await pedidos.create(model,newDetail);
        if(!insertId) return {message:"Internal server error",code:500};
        const link = links.created(model,insertId);
        const response = {message:"Registro insertado en la base de datos",link:link,code:201}
        return response;
    } catch (error) {
        throw new Error(`Error en el controlador ${model}, error: ${error}`);
    }
}

/**
 * Modify one detail of an order
 * @param params params request object
 * @param body data of the detail
 */
export const updateDetail = async(params: any, body: any): Promise<any> => {
    let { data } = body;
    let { id,id1 } = params;
    if(isNaN(id) || isNaN(id1)) return {message:`${id} o ${id1} No son un ID valido`,code:400};
    try {
        const pedido = await pedidos.getOne(model,id,{fields:'id'});
        if(!pedido) return {message:"Recurso no encontrado",code:404};

        const detalle = await pedidos.getOne(submodel,id1,{fields:'id'});
        if(!detalle) return {message:"Recurso no encontrado",code:404};

        const newDetail: IDetPedidos = data;
        const { affectedRows } = await pedidos.update(submodel,id1,newDetail);

        if(!affectedRows) return {message:"Internal server error",code:500};
        const link = links.created(model,id);
        const response = {message:"Registro actualizdo en la base de datos",link:link,code:201}
        return response;
    } catch (error) {
        throw new Error(`Error en el controlador ${model}, error: ${error}`);
    }
}


/**
 * Remove a detail from the order
 * @param params params request object
 */
export const deleteDetail = async (params: any):Promise<any> => {
    let { id,id1 } = params;
    if(isNaN(id) || isNaN(id1)) return {message:`${id} o ${id1} No son un ID valido`,code:400};
    try {
        const pedido = await pedidos.getOne(model,id,{fields:'id'});
        if(!pedido) return {message:"Recurso no encontrado",code:404};
        
        await pedidos.remove(submodel,id1);
        const response = {message:"Registro eliminado en la base de datos",code:201}
        return response;
    } catch (error) {
        throw new Error(`Error en el controlador ${model}, error: ${error}`);
    }
}