import * as pedidos from '../../helpers/consult';
import * as links from '../../helpers/links'
import { Request } from 'express';
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
                let pres:IDetPedidos[] = await pedidos.getOtherByMe(model, id as string, {}, 'submodel');
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
            let pres:IDetPedidos[] = await pedidos.getOtherByMe(model, id as string, {}, submodel);
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