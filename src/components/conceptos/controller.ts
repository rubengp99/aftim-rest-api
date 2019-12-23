import * as conceptos from '../../helpers/consult';
import * as links from '../../helpers/links'
import { IConcepto } from './model';

const model = 'conceptos';

/**
 * Get all last concepts
 * @param query modifier of the consult
 */ 
export const get = async (query:any): Promise<any> => {
    try {
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
                    let pres = await conceptos.getOtherByMe(model, id as string, 'presentaciones', {}) as any[];
                    data[i].presentaciones = pres;
                }
            } else if (fields.includes('presentaciones')) {
                for (let i = 0; i < data.length; i++) {
                    let { id } = data[i];
                    let pres = await conceptos.getOtherByMe(model, id as string, 'presentaciones', {}) as any[];
                    data[i].presentaciones = pres; // populo el objeto con el arreglo de presentaciones
                }
            }
            let link = links.pages(data, 'conceptos', count, totalCount, limit);
            let response = Object.assign({ totalCount, count, data }, link);
            return response;
        } else {
            return { message: "No se encontraron registros" }
        }
    } catch (error) {
        throw new Error(`Error en el controlador ${model}, error: ${error}`);
    }
}

/**
 * Get one concept
 * @param id id of the concept
 * @param query modifier of the consult
 */
export const getOne = async (id:string | number ,query:any):Promise<any> =>{
    try {
        if(isNaN(id as number)){
            return {message:`${id} no es un ID valido`};
        }
        let data:IConcepto[] = await conceptos.getOne(model,id,query);
        let count = await conceptos.count(model);
        let {fields} = query;
        if(data[0]){
            if (!fields) {                
                let pres = await conceptos.getOtherByMe(model, id as string, 'presentaciones', {}) as any[];
                data[0].presentaciones = pres;
            } else if (fields.includes('presentaciones')) {
                let pres = await conceptos.getOtherByMe(model, id as string, 'presentaciones', {}) as any[];
                data[0].presentaciones = pres;
            }
            let link = links.records(data,'grupos',count);
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
 * Get all the deposits where the concept it is
 * @param id id of the concept
 * @param query modifier of the consult
 */
export const getDepositsByConcept = async (id:string | number,query:any):Promise<any>=>{
    try {
        if(isNaN(id as number)){
            return {message:`${id} no es un ID valido`};
        }
        let recurso:IConcepto = await conceptos.getOne(model,id,{fields:'id'});
        if(!recurso){
            return {response:{message:"No se encontro el recurso indicado"}, code:404};
        }
        let data:any = await conceptos.getOtherByMe(model,id,'movimiento_deposito',{fields:'depositos_id,existencia'});
        let totalCount = await conceptos.count('depositos');
        let count = data.length;
        let {limit} = query;
        if(count > 0){
            let link = links.pages(data,`conceptos/${id}/depositos`,count,totalCount,limit);
            let response = Object.assign({totalCount,count,data},link);
            return {response,code:200};
        }else{
            return {response:{count,totalCount,message:"No se encontraron registros"},code:200};
        }

    } catch (error) {
        throw new Error(`Error en el controlador ${model}, error: ${error}`);
    }
}

/**
 * Get all the photos of the concept
 * @param id id of the concept
 * @param query modifier of the consult
 */
export const getPhotosByConcept = async (id:string | number ,query:any ):Promise<any> => {
    try {
        if(isNaN(id as number)){
            return {message:`${id} no es un ID valido`};
        }
        let recurso:IConcepto = await conceptos.getOne(model,id,{fields:'id'});
        if(!recurso){
            return {response:{message:"No se encontro el recurso indicado"}, code:404};
        }
        let data:any = await conceptos.getOtherByMe(model,id,'rest_galeria',query);
        let totalCount = await conceptos.countOther(model,'rest_galeria',id);
        let count = data.length;
        let {limit} = query;
        if(count > 0){
            let link = links.pages(data,`conceptos/${id}/photos`,count,totalCount,limit);
            let response = Object.assign({totalCount,count,data},link);
            return {response,code:200};
        }else{
            return {response:{count,totalCount,message:"No se encontraron registros"},code:200};
        }
    } catch (error) {
        throw new Error(`Error al consultar la base de datos, error: ${error}`);
    }
}


/**
 * Create a new concept
 * @param body data of the concept
 */
export const create = async (body:any):Promise<any> =>{
    let {data,data1} = body;
    let newConcepto:IConcepto = data;
    let presentaciones = data1;
    try {
        let {insertId} = await conceptos.create(model,newConcepto) as any;
        presentaciones.forEach(async (element: any) => {
            element.conceptos_id=insertId;
            await conceptos.create('presentaciones',element);
        });
        let link = links.created('conceptos',insertId);
        let response = Object.assign({message:"Registro insertado en la base de datos"},{link:link});
        return {response,code:201};
    } catch (error) {
        throw new Error(`Error en el controlador ${model}, error: ${error}`);
    }
}
/**
 * Update a concept
 * @param params params request object
 * @param query data of the concept
 */
export const update = async (params:any,body:any):Promise<any> => {
    let {id} = params;
    let {data,data1} = body;
    let newGrupo:IConcepto = data;
    let presentaciones = data1;
    try {
        let {affectedRows} = await conceptos.update(model,id,newGrupo) as any;
        presentaciones.forEach(async (element:any) => {
            await conceptos.update('presentaciones',element.id,element);
        });
        let link = links.created('grupos',id);
        let response = Object.assign({message:"Registro actualizado en la base de datos",affectedRows},{link:link});
        return {response,code:201};
    } catch (error) {
        throw new Error(`Error en el controlador ${model}, error: ${error}`);
    }
}

/**
 * Delete a concept
 * @param params params request object
 */
export const remove = async (params:any):Promise<any> => {
    let {id} = params;
    try {
        let pres = await conceptos.getOtherByMe(model, id as string, 'presentaciones', {}) as any[];
        pres.forEach(async (element:any) => {
            await conceptos.remove('presentaciones',element.id);
        });
        await conceptos.remove(model,id);
        return {response:{message:"Registro eliminado de la base de datos"},code:200};   
    } catch (error) {
        throw new Error(`Error en el controlador ${model}, error: ${error}`);
    }
}