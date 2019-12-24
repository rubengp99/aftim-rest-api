import * as pedidos from '../../helpers/consult';
import * as links from '../../helpers/links'
import { Request, response } from 'express';
import { IPedidos, IDetPedidos } from './model';

const model  = "pedidos";
const submodel = "det_pedidos"

export const get = async (req:Request): Promise<any> =>{
    try {
        const { query } = req;
        let data:IPedidos[] = await pedidos.get(model,query);
        let totalCount: number = await pedidos.count(model);
        let count = data.length;
        let { limit } = query;
        if(count > 0){
            for (let i = 0; i < data.length; i++) {
                let { id } = data[i];
                let pres:IDetPedidos[] = await pedidos.getOtherByMe(model, id as string, 'submodel');
                data[i].detalles = pres;
            }
            let link = links.pages(data, model, count, totalCount, limit);
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
        let data:IPedidos[] = await pedidos.getOne(model,id,query);
        let count:number = await pedidos.count(model);
        if(data[0]){
            let pres:IDetPedidos[] = await pedidos.getOtherByMe(model, id as string, submodel);
            data[0].detalles = pres;
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
    let {data,data1} = req.body;
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
        throw new Error(`Error al consultar la base de datos, error: ${error}`);
    }
}


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
        throw new Error(`Error al consultar la base de datos, error: ${error}`);
    }
}

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
        throw new Error(`Error al consultar la base de datos, error: ${error}`);
    }
}

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
        throw new Error(`Error al consultar la base de datos, error: ${error}`);
    }
}