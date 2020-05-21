import * as ensamblado from '../../helpers/consult';
import * as links from '../../helpers/links'
import * as respuestas from '../../errors';
import { Request } from 'express';
import { IEnsamblado } from './model';

const model = "adm_enc_ensamblado";

/**
 * 
 * @param req params of the request
 */
export const get = async (req:Request): Promise<any> =>{
    try {
        const { query } = req;
        let data:IEnsamblado[] = await ensamblado.get(model,query);
        let totalCount: number = await ensamblado.count(model);
        let count = data.length;
        let { limit } = query;

        if(count > 0) return respuestas.ElementNotFound;

        for (let i = 0; i < data.length; i++) {
            let { id } = data[i];
            let pres:any[] = await ensamblado.getOtherByMe(model, id as string, 'adm_det_ensamblado', {});
            data[i].detalles = pres;
        }
        let link = links.pages(data, 'ensamblado', count, totalCount, limit);
        let response = Object.assign({ totalCount, count, data }, link);
        
        return { response, code: respuestas.Ok.code };
    } catch (error) {
        if(error.message ==='BD_SYNTAX_ERROR') return respuestas.BadRequest;
        console.log(`Error al consultar la base de datos, error: ${error}`);
        return respuestas.InternalServerError;
    }
}

/**
 * 
 * @param id id of the entity
 * @param query modifier of the consulter
 */
export const getOne = async (id:string | number ,query:any): Promise<any> =>{
    try {
        if(isNaN(id as number)) return respuestas.InvalidID

        let data:IEnsamblado[] = await ensamblado.getOne(model,id,query);
        let count:number = await ensamblado.count(model);
        
        if(!data[0]) return respuestas.ElementNotFound;

        let pres:any[] = await ensamblado.getOtherByMe(model, id as string, 'det_ensamblado', {});
        data[0].detalles = pres;
        let link = links.records(data,'ensamblado',count);
        let response = Object.assign({ data }, link);
        
        return { response, code: respuestas.Ok.code };
    } catch (error) {
        if(error.message ==='BD_SYNTAX_ERROR') return respuestas.BadRequest;
        console.log(`Error al consultar la base de datos, error: ${error}`);
        return respuestas.InternalServerError;
    }
}

/**
 * 
 * @param req body of the request
 */
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

        let link = links.created('ensamblado',insertId);
        let response = Object.assign({ message: respuestas.Created.message }, { link: link });
        
        return { response, code: respuestas.Created.code };
    } catch (error) {
        if(error.message ==='BD_SYNTAX_ERROR') return respuestas.BadRequest;
        console.log(`Error al consultar la base de datos, error: ${error}`);
        return respuestas.InternalServerError;
    }
}