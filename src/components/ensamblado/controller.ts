import * as ensamblado from '../../helpers/consult';
import * as links from '../../helpers/links'
import { Request } from 'express';
import { IEnsamblado } from './model';

const model = "enc_ensamblado";

export const get = async (req:Request): Promise<any> =>{
    try {
        const { query } = req;
        let data:IEnsamblado[] = await ensamblado.get(model,query);
        let totalCount: number = await ensamblado.count(model);
        let count = data.length;
        let { limit } = query;
        if(count > 0){
            for (let i = 0; i < data.length; i++) {
                let { id } = data[i];
                let pres:any[] = await ensamblado.getOtherByMe(model, id as string, 'det_ensamblado', {});
                data[i].detalles = pres;
            }
            let link = links.pages(data, 'ensamblado', count, totalCount, limit);
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
        let data:IEnsamblado[] = await ensamblado.getOne(model,id,query);
        let count:number = await ensamblado.count(model);
        if(data[0]){
            let pres:any[] = await ensamblado.getOtherByMe(model, id as string, 'det_ensamblado', {});
            data[0].detalles = pres;
            let link = links.records(data,'ensamblado',count);
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
    let newCargo: IEnsamblado = data;
    let detalles = data1;
    try {
        let {insertId} = await ensamblado.create(model,newCargo);
        detalles.forEach(async (element: any) => {
            element.enc_ensamblado_id=insertId;
            await ensamblado.create('det_ensamblado',element);
        });
        if(insertId){
            let link = links.created('ensamblado',insertId);
            let response = Object.assign({message:"Registro insertado en la base de datos"},{link:link});
            return {response,code:201};
        }
        return {response:"Error al crear entidad"};
    } catch (error) {
        throw new Error(`Error al consultar la base de datos, error: ${error}`);
    }
}