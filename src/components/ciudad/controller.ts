import * as cargos from '../../helpers/consult';
import * as links from '../../helpers/links'
import { Request } from 'express';
import { ICiudad } from './model';

const model = "ciudad";

export const get = async (req: Request): Promise<any> => {
    try {
        const { query } = req;
        let data: ICiudad[] = await cargos.get(model, query);
        let totalCount: number = await cargos.count(model);
        let count = data.length;
        let { limit } = query;
        if (count > 0) {
            let link = links.pages(data, 'ciudad', count, totalCount, limit);
            let response = Object.assign({ totalCount, count, data }, link);
            return response;
        } else {
            return { message: "No se encontraron registros" }
        }
    } catch (error) {
        throw new Error(`Error al consultar la base de datos, error: ${error}`);
    }
}


export const getOne = async (id: string | number, query: any): Promise<any> => {
    try {
        if (isNaN(id as number)) {
            return { message: `${id} no es un ID valido` };
        }
        let data: ICiudad[] = await cargos.getOne(model, id, query);
        let count: number = await cargos.count(model);
        if (data[0]) {
            let link = links.records(data, model, count);
            let response = Object.assign({ data }, link);
            return response;
        } else {
            return { message: "No se encontro el recurso indicado" };
        }
    } catch (error) {
        throw new Error(`Error al consultar la base de datos, error: ${error}`);
    }
}

export const create = async (req: Request): Promise<any> => {
    let { data } = req.body;
    let newCargo: ICiudad = data;
    try {
        let { insertId } = await cargos.create(model, newCargo);
        if (insertId) {
            let link = links.created('ciudad', insertId);
            let response = Object.assign({ message: "Registro insertado en la base de datos" }, { link: link });
            return { response, code: 201 };
        }
        return { response: "Error al crear entidad" };
    } catch (error) {
        throw new Error(`Error al consultar la base de datos, error: ${error}`);
    }
}