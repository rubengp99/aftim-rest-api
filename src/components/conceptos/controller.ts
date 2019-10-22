import * as conceptos from '../../helpers/consult';
import * as links from '../../helpers/links'
import { Request } from 'express';
import { IConcepto } from './model';

const model = 'conceptos';

//response with the concepts 
export const get = async (req: Request): Promise<any> => {
    try {
        const { query } = req; //requiero el objeto query del request para tener accesso al query del usuario
        let data: IConcepto[] = await conceptos.get(model, query);// consulto los conceptos
        let totalCount: number = await conceptos.count(model); // consulto el total de registros de la BD
        let count = data.length;
        let { fields, limit } = query;

        // si se encontraron registros
        if (count > 0) {
            // si no me pasaron campos requeridos o si en los campos estan las presentaciones entonces
            // consulto las presentaciones de ese producto
            if (!fields) {
                for (let i = 0; i < data.length; i++) {
                    let { id } = data[i];
                    let pres = await conceptos.getOtherByMe(model, id as string, {}, 'presentaciones') as any[];
                    data[i].presentaciones = pres;
                }
            } else if (fields.includes('presentaciones')) {
                for (let i = 0; i < data.length; i++) {
                    let { id } = data[i];
                    let pres = await conceptos.getOtherByMe(model, id as string, {}, 'presentaciones') as any[];
                    data[i].presentaciones = pres; // populo el objeto con el arreglo de presentaciones
                }
            }
            let link = links.pages(data, 'grupos', count, totalCount, limit);
            let response = Object.assign({ totalCount, count, data }, link);
            return response;
        } else {
            return { message: "No se encontraron registros" }
        }
    } catch (error) {
        throw new Error(`Error al consultar la base de datos, error: ${error}`);
    }
}

export const getOne = async (id:string | number ,query:any):Promise<any> =>{
    try {
        let data:IConcepto[] = await conceptos.getOne(model,id,query);
        let count = await conceptos.count(model);
        let {fields} = query;
        if(data){
            console.log(data);
            if (!fields) {
                let { id } = data[0];
                let pres = await conceptos.getOtherByMe(model, id as string, {}, 'presentaciones') as any[];
                data[0].presentaciones = pres;
            } else if (fields.includes('presentaciones')) {
                let { id } = data[0];
                console.log(id);
                let pres = await conceptos.getOtherByMe(model, id as string, {}, 'presentaciones') as any[];
                data[0].presentaciones = pres;
            }
            let link = links.records(data,'grupos',count);
            let response = Object.assign({data},link);
            return response;
        }else{
            return {message:"No se encontro el recurso indicado"};
        }
    } catch (error) {
        throw new Error(`Error al consultar la base de datos, error: ${error}`);
    }
}